package pl.rekru.repository;

import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import pl.rekru.domain.Job;

/**
 * Spring Data JPA repository for the Job entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    @Query(value = "select * from job where deleted is null order by id", nativeQuery = true)
    List<Job> findAllNotDeletedJobs();
}
