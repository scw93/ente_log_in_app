package pl.rekru.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import pl.rekru.domain.Employee2Job;

/**
 * Spring Data JPA repository for the Employee2Job entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Employee2JobRepository extends JpaRepository<Employee2Job, Long> {}
