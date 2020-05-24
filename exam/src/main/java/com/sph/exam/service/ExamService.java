package com.sph.exam.service;

import com.sph.exam.domain.Exam;
import com.sph.exam.repository.ExamRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Exam.
 */
@Service
@Transactional
public class ExamService {

    private final Logger log = LoggerFactory.getLogger(ExamService.class);

    private final ExamRepository examRepository;

    public ExamService(ExamRepository examRepository) {
        this.examRepository = examRepository;
    }

    /**
     * Save a exam.
     *
     * @param exam the entity to save
     * @return the persisted entity
     */
    public Exam save(Exam exam) {
        log.debug("Request to save Exam : {}", exam);
        return examRepository.save(exam);
    }

    /**
     * Get all the exams.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Exam> findAll(Pageable pageable) {
        log.debug("Request to get all Exams");
        return examRepository.findAll(pageable);
    }

    /**
     * Get all the Exam with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<Exam> findAllWithEagerRelationships(Pageable pageable) {
        return examRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one exam by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Exam> findOne(Long id) {
        log.debug("Request to get Exam : {}", id);
        return examRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the exam by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Exam : {}", id);
        examRepository.deleteById(id);
    }
}
