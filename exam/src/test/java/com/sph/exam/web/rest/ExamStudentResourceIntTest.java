package com.sph.exam.web.rest;

import com.sph.exam.ExamApp;

import com.sph.exam.domain.ExamStudent;
import com.sph.exam.repository.ExamStudentRepository;
import com.sph.exam.service.ExamStudentService;
import com.sph.exam.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.sph.exam.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ExamStudentResource REST controller.
 *
 * @see ExamStudentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ExamApp.class)
public class ExamStudentResourceIntTest {

    private static final String DEFAULT_ID_CUSTOMER = "AAAAAAAAAA";
    private static final String UPDATED_ID_CUSTOMER = "BBBBBBBBBB";

    @Autowired
    private ExamStudentRepository examStudentRepository;

    @Autowired
    private ExamStudentService examStudentService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restExamStudentMockMvc;

    private ExamStudent examStudent;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExamStudentResource examStudentResource = new ExamStudentResource(examStudentService);
        this.restExamStudentMockMvc = MockMvcBuilders.standaloneSetup(examStudentResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExamStudent createEntity(EntityManager em) {
        ExamStudent examStudent = new ExamStudent()
            .idCustomer(DEFAULT_ID_CUSTOMER);
        return examStudent;
    }

    @Before
    public void initTest() {
        examStudent = createEntity(em);
    }

    @Test
    @Transactional
    public void createExamStudent() throws Exception {
        int databaseSizeBeforeCreate = examStudentRepository.findAll().size();

        // Create the ExamStudent
        restExamStudentMockMvc.perform(post("/api/exam-students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(examStudent)))
            .andExpect(status().isCreated());

        // Validate the ExamStudent in the database
        List<ExamStudent> examStudentList = examStudentRepository.findAll();
        assertThat(examStudentList).hasSize(databaseSizeBeforeCreate + 1);
        ExamStudent testExamStudent = examStudentList.get(examStudentList.size() - 1);
        assertThat(testExamStudent.getIdCustomer()).isEqualTo(DEFAULT_ID_CUSTOMER);
    }

    @Test
    @Transactional
    public void createExamStudentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = examStudentRepository.findAll().size();

        // Create the ExamStudent with an existing ID
        examStudent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExamStudentMockMvc.perform(post("/api/exam-students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(examStudent)))
            .andExpect(status().isBadRequest());

        // Validate the ExamStudent in the database
        List<ExamStudent> examStudentList = examStudentRepository.findAll();
        assertThat(examStudentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllExamStudents() throws Exception {
        // Initialize the database
        examStudentRepository.saveAndFlush(examStudent);

        // Get all the examStudentList
        restExamStudentMockMvc.perform(get("/api/exam-students?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(examStudent.getId().intValue())))
            .andExpect(jsonPath("$.[*].idCustomer").value(hasItem(DEFAULT_ID_CUSTOMER.toString())));
    }
    
    @Test
    @Transactional
    public void getExamStudent() throws Exception {
        // Initialize the database
        examStudentRepository.saveAndFlush(examStudent);

        // Get the examStudent
        restExamStudentMockMvc.perform(get("/api/exam-students/{id}", examStudent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(examStudent.getId().intValue()))
            .andExpect(jsonPath("$.idCustomer").value(DEFAULT_ID_CUSTOMER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingExamStudent() throws Exception {
        // Get the examStudent
        restExamStudentMockMvc.perform(get("/api/exam-students/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExamStudent() throws Exception {
        // Initialize the database
        examStudentService.save(examStudent);

        int databaseSizeBeforeUpdate = examStudentRepository.findAll().size();

        // Update the examStudent
        ExamStudent updatedExamStudent = examStudentRepository.findById(examStudent.getId()).get();
        // Disconnect from session so that the updates on updatedExamStudent are not directly saved in db
        em.detach(updatedExamStudent);
        updatedExamStudent
            .idCustomer(UPDATED_ID_CUSTOMER);

        restExamStudentMockMvc.perform(put("/api/exam-students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedExamStudent)))
            .andExpect(status().isOk());

        // Validate the ExamStudent in the database
        List<ExamStudent> examStudentList = examStudentRepository.findAll();
        assertThat(examStudentList).hasSize(databaseSizeBeforeUpdate);
        ExamStudent testExamStudent = examStudentList.get(examStudentList.size() - 1);
        assertThat(testExamStudent.getIdCustomer()).isEqualTo(UPDATED_ID_CUSTOMER);
    }

    @Test
    @Transactional
    public void updateNonExistingExamStudent() throws Exception {
        int databaseSizeBeforeUpdate = examStudentRepository.findAll().size();

        // Create the ExamStudent

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExamStudentMockMvc.perform(put("/api/exam-students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(examStudent)))
            .andExpect(status().isBadRequest());

        // Validate the ExamStudent in the database
        List<ExamStudent> examStudentList = examStudentRepository.findAll();
        assertThat(examStudentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExamStudent() throws Exception {
        // Initialize the database
        examStudentService.save(examStudent);

        int databaseSizeBeforeDelete = examStudentRepository.findAll().size();

        // Delete the examStudent
        restExamStudentMockMvc.perform(delete("/api/exam-students/{id}", examStudent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ExamStudent> examStudentList = examStudentRepository.findAll();
        assertThat(examStudentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExamStudent.class);
        ExamStudent examStudent1 = new ExamStudent();
        examStudent1.setId(1L);
        ExamStudent examStudent2 = new ExamStudent();
        examStudent2.setId(examStudent1.getId());
        assertThat(examStudent1).isEqualTo(examStudent2);
        examStudent2.setId(2L);
        assertThat(examStudent1).isNotEqualTo(examStudent2);
        examStudent1.setId(null);
        assertThat(examStudent1).isNotEqualTo(examStudent2);
    }
}
