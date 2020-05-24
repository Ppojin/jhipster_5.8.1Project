package com.sph.exam.service;

import com.sph.exam.domain.ExamStudent;
import com.sph.exam.repository.ExamStudentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing ExamStudent.
 */
@Service
@Transactional
public class ExamStudentService {

    private final Logger log = LoggerFactory.getLogger(ExamStudentService.class);

    private final ExamStudentRepository examStudentRepository;

    public ExamStudentService(ExamStudentRepository examStudentRepository) {
        this.examStudentRepository = examStudentRepository;
    }

    /**
     * Save a examStudent.
     *
     * @param examStudent the entity to save
     * @return the persisted entity
     */
    public ExamStudent save(ExamStudent examStudent) {
        log.debug("Request to save ExamStudent : {}", examStudent);
        return examStudentRepository.save(examStudent);
    }

    /**
     * Get all the examStudents.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ExamStudent> findAll() {
        log.debug("Request to get all ExamStudents");
        return examStudentRepository.findAll();
    }


    /**
     * Get one examStudent by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<ExamStudent> findOne(Long id) {
        log.debug("Request to get ExamStudent : {}", id);
        return examStudentRepository.findById(id);
    }

    /**
     * Delete the examStudent by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ExamStudent : {}", id);
        examStudentRepository.deleteById(id);
    }
}
