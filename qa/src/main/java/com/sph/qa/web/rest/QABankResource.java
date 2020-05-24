package com.sph.qa.web.rest;
import com.sph.qa.domain.QABank;
import com.sph.qa.service.QABankService;
import com.sph.qa.web.rest.errors.BadRequestAlertException;
import com.sph.qa.web.rest.util.HeaderUtil;
import com.sph.qa.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing QABank.
 */
@RestController
@RequestMapping("/api")
public class QABankResource {

    private final Logger log = LoggerFactory.getLogger(QABankResource.class);

    private static final String ENTITY_NAME = "qaQaBank";

    private final QABankService qABankService;

    public QABankResource(QABankService qABankService) {
        this.qABankService = qABankService;
    }

    /**
     * POST  /qa-banks : Create a new qABank.
     *
     * @param qABank the qABank to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qABank, or with status 400 (Bad Request) if the qABank has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qa-banks")
    public ResponseEntity<QABank> createQABank(@Valid @RequestBody QABank qABank) throws URISyntaxException {
        log.debug("REST request to save QABank : {}", qABank);
        if (qABank.getId() != null) {
            throw new BadRequestAlertException("A new qABank cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QABank result = qABankService.save(qABank);
        return ResponseEntity.created(new URI("/api/qa-banks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qa-banks : Updates an existing qABank.
     *
     * @param qABank the qABank to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qABank,
     * or with status 400 (Bad Request) if the qABank is not valid,
     * or with status 500 (Internal Server Error) if the qABank couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qa-banks")
    public ResponseEntity<QABank> updateQABank(@Valid @RequestBody QABank qABank) throws URISyntaxException {
        log.debug("REST request to update QABank : {}", qABank);
        if (qABank.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QABank result = qABankService.save(qABank);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qABank.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qa-banks : get all the qABanks.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qABanks in body
     */
    @GetMapping("/qa-banks")
    public ResponseEntity<List<QABank>> getAllQABanks(Pageable pageable) {
        log.debug("REST request to get a page of QABanks");
        Page<QABank> page = qABankService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qa-banks");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qa-banks/:id : get the "id" qABank.
     *
     * @param id the id of the qABank to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qABank, or with status 404 (Not Found)
     */
    @GetMapping("/qa-banks/{id}")
    public ResponseEntity<QABank> getQABank(@PathVariable Long id) {
        log.debug("REST request to get QABank : {}", id);
        Optional<QABank> qABank = qABankService.findOne(id);
        return ResponseUtil.wrapOrNotFound(qABank);
    }

    /**
     * DELETE  /qa-banks/:id : delete the "id" qABank.
     *
     * @param id the id of the qABank to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qa-banks/{id}")
    public ResponseEntity<Void> deleteQABank(@PathVariable Long id) {
        log.debug("REST request to delete QABank : {}", id);
        qABankService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
