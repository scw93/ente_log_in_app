package pl.rekru.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.rekru.domain.Employee;
import pl.rekru.repository.EmployeeRepository;
import pl.rekru.service.EmployeeService;
import pl.rekru.service.dto.EmployeeDTO;

/**
 * Service Implementation for managing {@link Employee}.
 */
@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    private final Logger log = LoggerFactory.getLogger(EmployeeServiceImpl.class);

    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Employee save(Employee employee) {
        log.debug("Request to save Employee : {}", employee);
        return employeeRepository.save(employee);
    }

    @Override
    public Employee update(Employee employee) {
        log.debug("Request to update Employee : {}", employee);
        return employeeRepository.save(employee);
    }

    @Override
    public Optional<Employee> partialUpdate(Employee employee) {
        log.debug("Request to partially update Employee : {}", employee);

        return employeeRepository
            .findById(employee.getId())
            .map(existingEmployee -> {
                if (employee.getFirstName() != null) {
                    existingEmployee.setFirstName(employee.getFirstName());
                }
                if (employee.getLastName() != null) {
                    existingEmployee.setLastName(employee.getLastName());
                }
                if (employee.getPesel() != null) {
                    existingEmployee.setPesel(employee.getPesel());
                }

                return existingEmployee;
            })
            .map(employeeRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EmployeeDTO> findAll() {
        //return employeeRepository.findAllNotDeletedEmployees();
        //return employeeRepository.findAllNotDeltEmployeesNotNative();
        List<Employee> sourceList = employeeRepository.findAllByDeletedIsNullOrderById();
        List<EmployeeDTO> returnList = new ArrayList<>();
        for (Employee employee : sourceList) {
            EmployeeDTO eDto = new EmployeeDTO();
            eDto.setDeleted(employee.getDeleted());
            eDto.setFirstName(employee.getFirstName());
            eDto.setLastName(employee.getLastName());
            eDto.setFullName(employee.getFirstName() + " " + employee.getLastName());
            eDto.setId(employee.getId());
            returnList.add(eDto);
        }
        return returnList;
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Employee> findOne(Long id) {
        log.debug("Request to get Employee : {}", id);
        return employeeRepository.findById(id);
    }

    @Override
    public Boolean delete(Long id) {
        log.debug("Request to delete Employee : {}", id);
        Optional<Employee> employee = employeeRepository.findById(id);
        if (employee.isPresent()) {
            Employee tmpEmployee = employee.get();
            tmpEmployee.setDeleted(true);
            employeeRepository.save(tmpEmployee);
            return true;
        } else {
            return false;
        }
    }
}
