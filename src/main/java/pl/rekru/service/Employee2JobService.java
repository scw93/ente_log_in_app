package pl.rekru.service;

import java.util.List;
import java.util.Optional;
import pl.rekru.domain.Employee2Job;

/**
 * Service Interface for managing {@link Employee2Job}.
 */
public interface Employee2JobService {
    /**
     * Save a employee2Job.
     *
     * @param employee2Job the entity to save.
     * @return the persisted entity.
     */
    Employee2Job save(Employee2Job employee2Job);

    /**
     * Updates a employee2Job.
     *
     * @param employee2Job the entity to update.
     * @return the persisted entity.
     */
    Employee2Job update(Employee2Job employee2Job);

    /**
     * Partially updates a employee2Job.
     *
     * @param employee2Job the entity to update partially.
     * @return the persisted entity.
     */
    // Optional<Employee2Job> partialUpdate(Employee2Job employee2Job);

    /**
     * Get all the employee2Jobs.
     *
     * @return the list of entities.
     */
    List<Employee2Job> findAll();

    /**
     * Get the "id" employee2Job.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Employee2Job> findOne(Long id);

    /**
     * Delete the "id" employee2Job.
     *
     * @param id the id of the entity.
     */
    Boolean delete(Long id);
}
