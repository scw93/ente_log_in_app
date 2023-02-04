package pl.rekru.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.rekru.domain.OperationHistory;
import pl.rekru.repository.OperationHistoryRepository;
import pl.rekru.service.OperationHistoryService;
import pl.rekru.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link pl.rekrutacja.domain.OperationHistory}.
 */
@RestController
@RequestMapping("/api")
public class OperationHistoryResource {

    private final Logger log = LoggerFactory.getLogger(OperationHistoryResource.class);

    private static final String ENTITY_NAME = "operationHistory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OperationHistoryService operationHistoryService;

    private final OperationHistoryRepository operationHistoryRepository;

    public OperationHistoryResource(
        OperationHistoryService operationHistoryService,
        OperationHistoryRepository operationHistoryRepository
    ) {
        this.operationHistoryService = operationHistoryService;
        this.operationHistoryRepository = operationHistoryRepository;
    }

    /**
     * {@code POST  /operation-histories} : Create a new operationHistory.
     *
     * @param operationHistory the operationHistory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new operationHistory, or with status {@code 400 (Bad Request)} if the operationHistory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/operation-histories")
    public ResponseEntity<OperationHistory> createOperationHistory(@RequestBody OperationHistory operationHistory)
        throws URISyntaxException {
        log.debug("REST request to save OperationHistory : {}", operationHistory);
        if (operationHistory.getId() != null) {
            throw new BadRequestAlertException("A new operationHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OperationHistory result = operationHistoryService.save(operationHistory);
        return ResponseEntity
            .created(new URI("/api/operation-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /operation-histories/:id} : Updates an existing operationHistory.
     *
     * @param id the id of the operationHistory to save.
     * @param operationHistory the operationHistory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated operationHistory,
     * or with status {@code 400 (Bad Request)} if the operationHistory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the operationHistory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/operation-histories/{id}")
    public ResponseEntity<OperationHistory> updateOperationHistory(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody OperationHistory operationHistory
    ) throws URISyntaxException {
        log.debug("REST request to update OperationHistory : {}, {}", id, operationHistory);
        if (operationHistory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, operationHistory.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!operationHistoryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        OperationHistory result = operationHistoryService.update(operationHistory);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, operationHistory.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /operation-histories/:id} : Partial updates given fields of an existing operationHistory, field will ignore if it is null
     *
     * @param id the id of the operationHistory to save.
     * @param operationHistory the operationHistory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated operationHistory,
     * or with status {@code 400 (Bad Request)} if the operationHistory is not valid,
     * or with status {@code 404 (Not Found)} if the operationHistory is not found,
     * or with status {@code 500 (Internal Server Error)} if the operationHistory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/operation-histories/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<OperationHistory> partialUpdateOperationHistory(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody OperationHistory operationHistory
    ) throws URISyntaxException {
        log.debug("REST request to partial update OperationHistory partially : {}, {}", id, operationHistory);
        if (operationHistory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, operationHistory.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!operationHistoryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<OperationHistory> result = operationHistoryService.partialUpdate(operationHistory);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, operationHistory.getId().toString())
        );
    }

    /**
     * {@code GET  /operation-histories} : get all the operationHistories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of operationHistories in body.
     */
    @GetMapping("/operation-histories")
    public List<OperationHistory> getAllOperationHistories() {
        log.debug("REST request to get all OperationHistories");
        return operationHistoryService.findAll();
    }

    /**
     * {@code GET  /operation-histories/:id} : get the "id" operationHistory.
     *
     * @param id the id of the operationHistory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the operationHistory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/operation-histories/{id}")
    public ResponseEntity<OperationHistory> getOperationHistory(@PathVariable Long id) {
        log.debug("REST request to get OperationHistory : {}", id);
        Optional<OperationHistory> operationHistory = operationHistoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(operationHistory);
    }

    /**
     * {@code DELETE  /operation-histories/:id} : delete the "id" operationHistory.
     *
     * @param id the id of the operationHistory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/operation-histories/{id}")
    public ResponseEntity<Void> deleteOperationHistory(@PathVariable Long id) {
        log.debug("REST request to delete OperationHistory : {}", id);
        operationHistoryService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
