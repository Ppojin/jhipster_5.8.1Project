package com.sph.qa.service;

import com.sph.qa.domain.QABank;
import com.sph.qa.repository.QABankRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing QABank.
 */
@Service
@Transactional
public class QABankService {

    private final Logger log = LoggerFactory.getLogger(QABankService.class);

    private final QABankRepository qABankRepository;

    public QABankService(QABankRepository qABankRepository) {
        this.qABankRepository = qABankRepository;
    }

    /**
     * Save a qABank.
     *
     * @param qABank the entity to save
     * @return the persisted entity
     */
    public QABank save(QABank qABank) {
        log.debug("Request to save QABank : {}", qABank);
        return qABankRepository.save(qABank);
    }

    /**
     * Get all the qABanks.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<QABank> findAll(Pageable pageable) {
        log.debug("Request to get all QABanks");
        return qABankRepository.findAll(pageable);
    }


    /**
     * Get one qABank by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<QABank> findOne(Long id) {
        log.debug("Request to get QABank : {}", id);
        return qABankRepository.findById(id);
    }

    /**
     * Delete the qABank by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete QABank : {}", id);
        qABankRepository.deleteById(id);
    }
}
