package com.sph.exam.web.rest;

import com.sph.exam.ExamApp;

import com.sph.exam.domain.ExamQABank;
import com.sph.exam.repository.ExamQABankRepository;
import com.sph.exam.service.ExamQABankService;
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
 * Test class for the ExamQABankResource REST controller.
 *
 * @see ExamQABankResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ExamApp.class)
public class ExamQABankResourceIntTest {

    private static final String DEFAULT_ID_QA_BANK = "AAAAAAAAAA";
    private static final String UPDATED_ID_QA_BANK = "BBBBBBBBBB";

    @Autowired
    private ExamQABankRepository examQABankRepository;

    @Autowired
    private ExamQABankService examQABankService;

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

    private MockMvc restExamQABankMockMvc;

    private ExamQABank examQABank;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExamQABankResource examQABankResource = new ExamQABankResource(examQABankService);
        this.restExamQABankMockMvc = MockMvcBuilders.standaloneSetup(examQABankResource)
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
    public static ExamQABank createEntity(EntityManager em) {
        ExamQABank examQABank = new ExamQABank()
            .idQABank(DEFAULT_ID_QA_BANK);
        return examQABank;
    }

    @Before
    public void initTest() {
        examQABank = createEntity(em);
    }

    @Test
    @Transactional
    public void createExamQABank() throws Exception {
        int databaseSizeBeforeCreate = examQABankRepository.findAll().size();

        // Create the ExamQABank
        restExamQABankMockMvc.perform(post("/api/exam-qa-banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(examQABank)))
            .andExpect(status().isCreated());

        // Validate the ExamQABank in the database
        List<ExamQABank> examQABankList = examQABankRepository.findAll();
        assertThat(examQABankList).hasSize(databaseSizeBeforeCreate + 1);
        ExamQABank testExamQABank = examQABankList.get(examQABankList.size() - 1);
        assertThat(testExamQABank.getIdQABank()).isEqualTo(DEFAULT_ID_QA_BANK);
    }

    @Test
    @Transactional
    public void createExamQABankWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = examQABankRepository.findAll().size();

        // Create the ExamQABank with an existing ID
        examQABank.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExamQABankMockMvc.perform(post("/api/exam-qa-banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(examQABank)))
            .andExpect(status().isBadRequest());

        // Validate the ExamQABank in the database
        List<ExamQABank> examQABankList = examQABankRepository.findAll();
        assertThat(examQABankList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllExamQABanks() throws Exception {
        // Initialize the database
        examQABankRepository.saveAndFlush(examQABank);

        // Get all the examQABankList
        restExamQABankMockMvc.perform(get("/api/exam-qa-banks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(examQABank.getId().intValue())))
            .andExpect(jsonPath("$.[*].idQABank").value(hasItem(DEFAULT_ID_QA_BANK.toString())));
    }
    
    @Test
    @Transactional
    public void getExamQABank() throws Exception {
        // Initialize the database
        examQABankRepository.saveAndFlush(examQABank);

        // Get the examQABank
        restExamQABankMockMvc.perform(get("/api/exam-qa-banks/{id}", examQABank.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(examQABank.getId().intValue()))
            .andExpect(jsonPath("$.idQABank").value(DEFAULT_ID_QA_BANK.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingExamQABank() throws Exception {
        // Get the examQABank
        restExamQABankMockMvc.perform(get("/api/exam-qa-banks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExamQABank() throws Exception {
        // Initialize the database
        examQABankService.save(examQABank);

        int databaseSizeBeforeUpdate = examQABankRepository.findAll().size();

        // Update the examQABank
        ExamQABank updatedExamQABank = examQABankRepository.findById(examQABank.getId()).get();
        // Disconnect from session so that the updates on updatedExamQABank are not directly saved in db
        em.detach(updatedExamQABank);
        updatedExamQABank
            .idQABank(UPDATED_ID_QA_BANK);

        restExamQABankMockMvc.perform(put("/api/exam-qa-banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedExamQABank)))
            .andExpect(status().isOk());

        // Validate the ExamQABank in the database
        List<ExamQABank> examQABankList = examQABankRepository.findAll();
        assertThat(examQABankList).hasSize(databaseSizeBeforeUpdate);
        ExamQABank testExamQABank = examQABankList.get(examQABankList.size() - 1);
        assertThat(testExamQABank.getIdQABank()).isEqualTo(UPDATED_ID_QA_BANK);
    }

    @Test
    @Transactional
    public void updateNonExistingExamQABank() throws Exception {
        int databaseSizeBeforeUpdate = examQABankRepository.findAll().size();

        // Create the ExamQABank

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExamQABankMockMvc.perform(put("/api/exam-qa-banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(examQABank)))
            .andExpect(status().isBadRequest());

        // Validate the ExamQABank in the database
        List<ExamQABank> examQABankList = examQABankRepository.findAll();
        assertThat(examQABankList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExamQABank() throws Exception {
        // Initialize the database
        examQABankService.save(examQABank);

        int databaseSizeBeforeDelete = examQABankRepository.findAll().size();

        // Delete the examQABank
        restExamQABankMockMvc.perform(delete("/api/exam-qa-banks/{id}", examQABank.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ExamQABank> examQABankList = examQABankRepository.findAll();
        assertThat(examQABankList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExamQABank.class);
        ExamQABank examQABank1 = new ExamQABank();
        examQABank1.setId(1L);
        ExamQABank examQABank2 = new ExamQABank();
        examQABank2.setId(examQABank1.getId());
        assertThat(examQABank1).isEqualTo(examQABank2);
        examQABank2.setId(2L);
        assertThat(examQABank1).isNotEqualTo(examQABank2);
        examQABank1.setId(null);
        assertThat(examQABank1).isNotEqualTo(examQABank2);
    }
}
