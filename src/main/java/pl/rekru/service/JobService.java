package pl.rekru.service;

import java.util.List;
import java.util.Optional;
import pl.rekru.domain.Job;

/**
 * Service Interface for managing {@link Job}.
 */
public interface JobService {
    /**
     * Save a job.
     *
     * @param job the entity to save.
     * @return the persisted entity.
     */
    Job save(Job job);

    /**
     * Updates a job.
     *
     * @param job the entity to update.
     * @return the persisted entity.
     */
    Job update(Job job);

    /**
     * Partially updates a job.
     *
     * @param job the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Job> partialUpdate(Job job);

    /**
     * Get all the jobs.
     *
     * @return the list of entities.
     */
    List<Job> findAll();

    /**
     * Get the "id" job.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Job> findOne(Long id);

    /**
     * Delete the "id" job.
     *
     * @param id the id of the entity.
     * @return
     */
    Boolean delete(Long id);
}
