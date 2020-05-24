package com.sph.exam.service;

import com.sph.exam.domain.ExamQABank;
import com.sph.exam.repository.ExamQABankRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing ExamQABank.
 */
@Service
@Transactional
public class ExamQABankService {

    private final Logger log = LoggerFactory.getLogger(ExamQABankService.class);

    private final ExamQABankRepository examQABankRepository;

    public ExamQABankService(ExamQABankRepository examQABankRepository) {
        this.examQABankRepository = examQABankRepository;
    }

    /**
     * Save a examQABank.
     *
     * @param examQABank the entity to save
     * @return the persisted entity
     */
    public ExamQABank save(ExamQABank examQABank) {
        log.debug("Request to save ExamQABank : {}", examQABank);
        return examQABankRepository.save(examQABank);
    }

    /**
     * Get all the examQABanks.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ExamQABank> findAll(Pageable pageable) {
        log.debug("Request to get all ExamQABanks");
        return examQABankRepository.findAll(pageable);
    }


    /**
     * Get one examQABank by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<ExamQABank> findOne(Long id) {
        log.debug("Request to get ExamQABank : {}", id);
        return examQABankRepository.findById(id);
    }

    /**
     * Delete the examQABank by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ExamQABank : {}", id);
        examQABankRepository.deleteById(id);
    }
}
