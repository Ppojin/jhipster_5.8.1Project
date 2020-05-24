package com.sph.exam.web.rest;
import com.sph.exam.domain.ExamQABank;
import com.sph.exam.service.ExamQABankService;
import com.sph.exam.web.rest.errors.BadRequestAlertException;
import com.sph.exam.web.rest.util.HeaderUtil;
import com.sph.exam.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ExamQABank.
 */
@RestController
@RequestMapping("/api")
public class ExamQABankResource {

    private final Logger log = LoggerFactory.getLogger(ExamQABankResource.class);

    private static final String ENTITY_NAME = "examExamQaBank";

    private final ExamQABankService examQABankService;

    public ExamQABankResource(ExamQABankService examQABankService) {
        this.examQABankService = examQABankService;
    }

    /**
     * POST  /exam-qa-banks : Create a new examQABank.
     *
     * @param examQABank the examQABank to create
     * @return the ResponseEntity with status 201 (Created) and with body the new examQABank, or with status 400 (Bad Request) if the examQABank has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/exam-qa-banks")
    public ResponseEntity<ExamQABank> createExamQABank(@RequestBody ExamQABank examQABank) throws URISyntaxException {
        log.debug("REST request to save ExamQABank : {}", examQABank);
        if (examQABank.getId() != null) {
            throw new BadRequestAlertException("A new examQABank cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ExamQABank result = examQABankService.save(examQABank);
        return ResponseEntity.created(new URI("/api/exam-qa-banks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /exam-qa-banks : Updates an existing examQABank.
     *
     * @param examQABank the examQABank to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated examQABank,
     * or with status 400 (Bad Request) if the examQABank is not valid,
     * or with status 500 (Internal Server Error) if the examQABank couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/exam-qa-banks")
    public ResponseEntity<ExamQABank> updateExamQABank(@RequestBody ExamQABank examQABank) throws URISyntaxException {
        log.debug("REST request to update ExamQABank : {}", examQABank);
        if (examQABank.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ExamQABank result = examQABankService.save(examQABank);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, examQABank.getId().toString()))
            .body(result);
    }

    /**
     * GET  /exam-qa-banks : get all the examQABanks.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of examQABanks in body
     */
    @GetMapping("/exam-qa-banks")
    public ResponseEntity<List<ExamQABank>> getAllExamQABanks(Pageable pageable) {
        log.debug("REST request to get a page of ExamQABanks");
        Page<ExamQABank> page = examQABankService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/exam-qa-banks");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /exam-qa-banks/:id : get the "id" examQABank.
     *
     * @param id the id of the examQABank to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the examQABank, or with status 404 (Not Found)
     */
    @GetMapping("/exam-qa-banks/{id}")
    public ResponseEntity<ExamQABank> getExamQABank(@PathVariable Long id) {
        log.debug("REST request to get ExamQABank : {}", id);
        Optional<ExamQABank> examQABank = examQABankService.findOne(id);
        return ResponseUtil.wrapOrNotFound(examQABank);
    }

    /**
     * DELETE  /exam-qa-banks/:id : delete the "id" examQABank.
     *
     * @param id the id of the examQABank to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/exam-qa-banks/{id}")
    public ResponseEntity<Void> deleteExamQABank(@PathVariable Long id) {
        log.debug("REST request to delete ExamQABank : {}", id);
        examQABankService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
