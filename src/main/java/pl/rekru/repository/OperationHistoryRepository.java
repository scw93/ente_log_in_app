package pl.rekru.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import pl.rekru.domain.OperationHistory;

/**
 * Spring Data JPA repository for the OperationHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OperationHistoryRepository extends JpaRepository<OperationHistory, Long> {}
