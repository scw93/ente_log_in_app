package pl.rekru.service.impl;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.rekru.domain.Employee2Job;
import pl.rekru.repository.Employee2JobRepository;
import pl.rekru.service.Employee2JobService;

/**
 * Service Implementation for managing {@link Employee2Job}.
 */
@Service
@Transactional
public class Employee2JobServiceImpl implements Employee2JobService {

    private final Logger log = LoggerFactory.getLogger(Employee2JobServiceImpl.class);

    private final Employee2JobRepository employee2JobRepository;

    public Employee2JobServiceImpl(Employee2JobRepository employee2JobRepository) {
        this.employee2JobRepository = employee2JobRepository;
    }

    @Override
    public Employee2Job save(Employee2Job employee2Job) {
        log.debug("Request to save Employee2Job : {}", employee2Job);
        return employee2JobRepository.save(employee2Job);
    }

    @Override
    public Employee2Job update(Employee2Job employee2Job) {
        log.debug("Request to update Employee2Job : {}", employee2Job);
        return employee2JobRepository.save(employee2Job);
    }

    @Override
    public Optional<Employee2Job> partialUpdate(Employee2Job employee2Job) {
        log.debug("Request to partially update Employee2Job : {}", employee2Job);

        return employee2JobRepository
            .findById(employee2Job.getId())
            .map(existingEmployee2Job -> {
                if (employee2Job.getEmployeeId() != null) {
                    existingEmployee2Job.setEmployeeId(employee2Job.getEmployeeId());
                }
                if (employee2Job.getJobId() != null) {
                    existingEmployee2Job.setJobId(employee2Job.getJobId());
                }

                return existingEmployee2Job;
            })
            .map(employee2JobRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Employee2Job> findAll() {
        log.debug("Request to get all Employee2Jobs");
        return employee2JobRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Employee2Job> findOne(Long id) {
        log.debug("Request to get Employee2Job : {}", id);
        return employee2JobRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Employee2Job : {}", id);
        employee2JobRepository.deleteById(id);
    }
}
