package com.sph.exam.web.rest;

import com.sph.exam.ExamApp;

import com.sph.exam.domain.Exam;
import com.sph.exam.repository.ExamRepository;
import com.sph.exam.service.ExamService;
import com.sph.exam.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;


import static com.sph.exam.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.sph.exam.domain.enumeration.Level;
/**
 * Test class for the ExamResource REST controller.
 *
 * @see ExamResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ExamApp.class)
public class ExamResourceIntTest {

    private static final String DEFAULT_ID_EXAM = "AAAAAAAAAA";
    private static final String UPDATED_ID_EXAM = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final Level DEFAULT_LEVEL = Level.ONE;
    private static final Level UPDATED_LEVEL = Level.TWO;

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ExamRepository examRepository;

    @Mock
    private ExamRepository examRepositoryMock;

    @Mock
    private ExamService examServiceMock;

    @Autowired
    private ExamService examService;

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

    private MockMvc restExamMockMvc;

    private Exam exam;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExamResource examResource = new ExamResource(examService);
        this.restExamMockMvc = MockMvcBuilders.standaloneSetup(examResource)
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
    public static Exam createEntity(EntityManager em) {
        Exam exam = new Exam()
            .idExam(DEFAULT_ID_EXAM)
            .title(DEFAULT_TITLE)
            .level(DEFAULT_LEVEL)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE);
        return exam;
    }

    @Before
    public void initTest() {
        exam = createEntity(em);
    }

    @Test
    @Transactional
    public void createExam() throws Exception {
        int databaseSizeBeforeCreate = examRepository.findAll().size();

        // Create the Exam
        restExamMockMvc.perform(post("/api/exams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exam)))
            .andExpect(status().isCreated());

        // Validate the Exam in the database
        List<Exam> examList = examRepository.findAll();
        assertThat(examList).hasSize(databaseSizeBeforeCreate + 1);
        Exam testExam = examList.get(examList.size() - 1);
        assertThat(testExam.getIdExam()).isEqualTo(DEFAULT_ID_EXAM);
        assertThat(testExam.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testExam.getLevel()).isEqualTo(DEFAULT_LEVEL);
        assertThat(testExam.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testExam.getEndDate()).isEqualTo(DEFAULT_END_DATE);
    }

    @Test
    @Transactional
    public void createExamWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = examRepository.findAll().size();

        // Create the Exam with an existing ID
        exam.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExamMockMvc.perform(post("/api/exams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exam)))
            .andExpect(status().isBadRequest());

        // Validate the Exam in the database
        List<Exam> examList = examRepository.findAll();
        assertThat(examList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkIdExamIsRequired() throws Exception {
        int databaseSizeBeforeTest = examRepository.findAll().size();
        // set the field null
        exam.setIdExam(null);

        // Create the Exam, which fails.

        restExamMockMvc.perform(post("/api/exams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exam)))
            .andExpect(status().isBadRequest());

        List<Exam> examList = examRepository.findAll();
        assertThat(examList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = examRepository.findAll().size();
        // set the field null
        exam.setTitle(null);

        // Create the Exam, which fails.

        restExamMockMvc.perform(post("/api/exams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exam)))
            .andExpect(status().isBadRequest());

        List<Exam> examList = examRepository.findAll();
        assertThat(examList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLevelIsRequired() throws Exception {
        int databaseSizeBeforeTest = examRepository.findAll().size();
        // set the field null
        exam.setLevel(null);

        // Create the Exam, which fails.

        restExamMockMvc.perform(post("/api/exams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exam)))
            .andExpect(status().isBadRequest());

        List<Exam> examList = examRepository.findAll();
        assertThat(examList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStartDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = examRepository.findAll().size();
        // set the field null
        exam.setStartDate(null);

        // Create the Exam, which fails.

        restExamMockMvc.perform(post("/api/exams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exam)))
            .andExpect(status().isBadRequest());

        List<Exam> examList = examRepository.findAll();
        assertThat(examList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEndDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = examRepository.findAll().size();
        // set the field null
        exam.setEndDate(null);

        // Create the Exam, which fails.

        restExamMockMvc.perform(post("/api/exams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exam)))
            .andExpect(status().isBadRequest());

        List<Exam> examList = examRepository.findAll();
        assertThat(examList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllExams() throws Exception {
        // Initialize the database
        examRepository.saveAndFlush(exam);

        // Get all the examList
        restExamMockMvc.perform(get("/api/exams?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(exam.getId().intValue())))
            .andExpect(jsonPath("$.[*].idExam").value(hasItem(DEFAULT_ID_EXAM.toString())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].level").value(hasItem(DEFAULT_LEVEL.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllExamsWithEagerRelationshipsIsEnabled() throws Exception {
        ExamResource examResource = new ExamResource(examServiceMock);
        when(examServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restExamMockMvc = MockMvcBuilders.standaloneSetup(examResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restExamMockMvc.perform(get("/api/exams?eagerload=true"))
        .andExpect(status().isOk());

        verify(examServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllExamsWithEagerRelationshipsIsNotEnabled() throws Exception {
        ExamResource examResource = new ExamResource(examServiceMock);
            when(examServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restExamMockMvc = MockMvcBuilders.standaloneSetup(examResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restExamMockMvc.perform(get("/api/exams?eagerload=true"))
        .andExpect(status().isOk());

            verify(examServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getExam() throws Exception {
        // Initialize the database
        examRepository.saveAndFlush(exam);

        // Get the exam
        restExamMockMvc.perform(get("/api/exams/{id}", exam.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(exam.getId().intValue()))
            .andExpect(jsonPath("$.idExam").value(DEFAULT_ID_EXAM.toString()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.level").value(DEFAULT_LEVEL.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingExam() throws Exception {
        // Get the exam
        restExamMockMvc.perform(get("/api/exams/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExam() throws Exception {
        // Initialize the database
        examService.save(exam);

        int databaseSizeBeforeUpdate = examRepository.findAll().size();

        // Update the exam
        Exam updatedExam = examRepository.findById(exam.getId()).get();
        // Disconnect from session so that the updates on updatedExam are not directly saved in db
        em.detach(updatedExam);
        updatedExam
            .idExam(UPDATED_ID_EXAM)
            .title(UPDATED_TITLE)
            .level(UPDATED_LEVEL)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);

        restExamMockMvc.perform(put("/api/exams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedExam)))
            .andExpect(status().isOk());

        // Validate the Exam in the database
        List<Exam> examList = examRepository.findAll();
        assertThat(examList).hasSize(databaseSizeBeforeUpdate);
        Exam testExam = examList.get(examList.size() - 1);
        assertThat(testExam.getIdExam()).isEqualTo(UPDATED_ID_EXAM);
        assertThat(testExam.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testExam.getLevel()).isEqualTo(UPDATED_LEVEL);
        assertThat(testExam.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testExam.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingExam() throws Exception {
        int databaseSizeBeforeUpdate = examRepository.findAll().size();

        // Create the Exam

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExamMockMvc.perform(put("/api/exams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exam)))
            .andExpect(status().isBadRequest());

        // Validate the Exam in the database
        List<Exam> examList = examRepository.findAll();
        assertThat(examList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExam() throws Exception {
        // Initialize the database
        examService.save(exam);

        int databaseSizeBeforeDelete = examRepository.findAll().size();

        // Delete the exam
        restExamMockMvc.perform(delete("/api/exams/{id}", exam.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Exam> examList = examRepository.findAll();
        assertThat(examList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Exam.class);
        Exam exam1 = new Exam();
        exam1.setId(1L);
        Exam exam2 = new Exam();
        exam2.setId(exam1.getId());
        assertThat(exam1).isEqualTo(exam2);
        exam2.setId(2L);
        assertThat(exam1).isNotEqualTo(exam2);
        exam1.setId(null);
        assertThat(exam1).isNotEqualTo(exam2);
    }
}
