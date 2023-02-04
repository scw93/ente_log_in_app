package pl.rekru.service;

import java.util.List;
import java.util.Optional;
import pl.rekru.domain.OperationHistory;

/**
 * Service Interface for managing {@link OperationHistory}.
 */
public interface OperationHistoryService {
    /**
     * Save a operationHistory.
     *
     * @param operationHistory the entity to save.
     * @return the persisted entity.
     */
    OperationHistory save(OperationHistory operationHistory);

    /**
     * Updates a operationHistory.
     *
     * @param operationHistory the entity to update.
     * @return the persisted entity.
     */
    OperationHistory update(OperationHistory operationHistory);

    /**
     * Partially updates a operationHistory.
     *
     * @param operationHistory the entity to update partially.
     * @return the persisted entity.
     */
    Optional<OperationHistory> partialUpdate(OperationHistory operationHistory);

    /**
     * Get all the operationHistories.
     *
     * @return the list of entities.
     */
    List<OperationHistory> findAll();

    /**
     * Get the "id" operationHistory.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<OperationHistory> findOne(Long id);

    /**
     * Delete the "id" operationHistory.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
