package pl.rekru.repository;

import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import pl.rekru.domain.Employee;

/**
 * Spring Data JPA repository for the Employee entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    //piszemy query!
    // @Query(value = "select * from employee where deleted is null order by last_name", nativeQuery = true)
    // List<Employee> findAllNotDeletedEmployees();

    // @Query("select e from Employee e where e.deleted is null order by e.firstName")
    // List<Employee> findAllNotDeltEmployeesNotNative();

    List<Employee> findAllByDeletedIsNullOrderById();
}
