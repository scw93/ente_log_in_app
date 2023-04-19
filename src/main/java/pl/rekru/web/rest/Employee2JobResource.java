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
import pl.rekru.domain.Employee2Job;
import pl.rekru.repository.Employee2JobRepository;
import pl.rekru.service.Employee2JobService;
import pl.rekru.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link pl.rekrutacja.domain.Employee2Job}.
 */
@RestController
@RequestMapping("/api")
public class Employee2JobResource {

    private final Logger log = LoggerFactory.getLogger(Employee2JobResource.class);

    private static final String ENTITY_NAME = "employee2Job";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final Employee2JobService employee2JobService;

    private final Employee2JobRepository employee2JobRepository;

    public Employee2JobResource(Employee2JobService employee2JobService, Employee2JobRepository employee2JobRepository) {
        this.employee2JobService = employee2JobService;
        this.employee2JobRepository = employee2JobRepository;
    }

    /**
     * {@code POST  /employee-2-jobs} : Create a new employee2Job.
     *
     * @param employee2Job the employee2Job to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new employee2Job, or with status {@code 400 (Bad Request)} if the employee2Job has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/employee-2-jobs")
    public ResponseEntity<Employee2Job> createEmployee2Job(@RequestBody Employee2Job employee2Job) throws URISyntaxException {
        log.debug("REST request to save Employee2Job : {}", employee2Job);
        if (employee2Job.getId() != null) {
            throw new BadRequestAlertException("A new employee2Job cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Employee2Job result = employee2JobService.save(employee2Job);
        return ResponseEntity
            .created(new URI("/api/employee-2-jobs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /employee-2-jobs/:id} : Updates an existing employee2Job.
     *
     * @param id the id of the employee2Job to save.
     * @param employee2Job the employee2Job to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated employee2Job,
     * or with status {@code 400 (Bad Request)} if the employee2Job is not valid,
     * or with status {@code 500 (Internal Server Error)} if the employee2Job couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/employee-2-jobs/{id}")
    public ResponseEntity<Employee2Job> updateEmployee2Job(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Employee2Job employee2Job
    ) throws URISyntaxException {
        log.debug("REST request to update Employee2Job : {}, {}", id, employee2Job);
        if (employee2Job.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, employee2Job.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!employee2JobRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Employee2Job result = employee2JobService.update(employee2Job);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, employee2Job.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /employee-2-jobs/:id} : Partial updates given fields of an existing employee2Job, field will ignore if it is null
     *
     * @param id the id of the employee2Job to save.
     * @param employee2Job the employee2Job to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated employee2Job,
     * or with status {@code 400 (Bad Request)} if the employee2Job is not valid,
     * or with status {@code 404 (Not Found)} if the employee2Job is not found,
     * or with status {@code 500 (Internal Server Error)} if the employee2Job couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    // @PatchMapping(value = "/employee-2-jobs/{id}", consumes = { "application/json", "application/merge-patch+json" })
    // public ResponseEntity<Employee2Job> partialUpdateEmployee2Job(
    //     @PathVariable(value = "id", required = false) final Long id,
    //     @RequestBody Employee2Job employee2Job
    // ) throws URISyntaxException {
    //     log.debug("REST request to partial update Employee2Job partially : {}, {}", id, employee2Job);
    //     if (employee2Job.getId() == null) {
    //         throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
    //     }
    //     if (!Objects.equals(id, employee2Job.getId())) {
    //         throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
    //     }

    //     if (!employee2JobRepository.existsById(id)) {
    //         throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
    //     }

    //     // Optional<Employee2Job> result = employee2JobService.partialUpdate(employee2Job);

    //     return ResponseUtil.wrapOrNotFound(
    //         result,
    //         HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, employee2Job.getId().toString())
    //     );
    // }

    /**
     * {@code GET  /employee-2-jobs} : get all the employee2Jobs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of employee2Jobs in body.
     */
    @GetMapping("/employee-2-jobs")
    public List<Employee2Job> getAllEmployees() {
        log.debug("REST request to get all Employee2Jobs");
        return employee2JobService.findAll();
    }

    /**
     * {@code GET  /employee-2-jobs/:id} : get the "id" employee2Job.
     *
     * @param id the id of the employee2Job to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the employee2Job, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/employee-2-jobs/{id}")
    public ResponseEntity<Employee2Job> getEmployee2Job(@PathVariable Long id) {
        log.debug("REST request to get Employee2Job : {}", id);
        Optional<Employee2Job> employee2Job = employee2JobService.findOne(id);
        return ResponseUtil.wrapOrNotFound(employee2Job);
    }

    /**
     * {@code DELETE  /employee-2-jobs/:id} : delete the "id" employee2Job.
     *
     * @param id the id of the employee2Job to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/employee-2-jobs/{id}") // przeczytać o deleteMapping itp
    public Boolean deleteEmployee2Job(@PathVariable Long id) {
        log.debug("REST request to delete Employee2Job : {}", id);
        return employee2JobService.delete(id);
    }
    // public ResponseEntity<Void> deleteEmployee2Job(@PathVariable Long id) {
    //     log.debug("REST request to delete Employee2Job : {}", id);
    // employee2JobService.delete(id);
    //     return ResponseEntity
    //         .noContent()
    //         .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
    //         .build();
    // }
}
