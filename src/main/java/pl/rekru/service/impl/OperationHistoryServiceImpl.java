package pl.rekru.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.rekru.domain.OperationHistory;
import pl.rekru.repository.OperationHistoryRepository;
import pl.rekru.service.OperationHistoryService;

/**
 * Service Implementation for managing {@link OperationHistory}.
 */
@Service
@Transactional
public class OperationHistoryServiceImpl implements OperationHistoryService {

    private final Logger log = LoggerFactory.getLogger(OperationHistoryServiceImpl.class);

    private final OperationHistoryRepository operationHistoryRepository;

    public OperationHistoryServiceImpl(OperationHistoryRepository operationHistoryRepository) {
        this.operationHistoryRepository = operationHistoryRepository;
    }

    @Override
    public OperationHistory save(OperationHistory operationHistory) {
        log.debug("Request to save OperationHistory : {}", operationHistory);
        return operationHistoryRepository.save(operationHistory);
    }

    @Override
    public OperationHistory update(OperationHistory operationHistory) {
        log.debug("Request to update OperationHistory : {}", operationHistory);
        return operationHistoryRepository.save(operationHistory);
    }

    @Override
    public Optional<OperationHistory> partialUpdate(OperationHistory operationHistory) {
        log.debug("Request to partially update OperationHistory : {}", operationHistory);

        return operationHistoryRepository
            .findById(operationHistory.getId())
            .map(existingOperationHistory -> {
                if (operationHistory.getUserId() != null) {
                    existingOperationHistory.setUserId(operationHistory.getUserId());
                }
                if (operationHistory.getDateOfChange() != null) {
                    existingOperationHistory.setDateOfChange(operationHistory.getDateOfChange());
                }
                if (operationHistory.getChangeDescription() != null) {
                    existingOperationHistory.setChangeDescription(operationHistory.getChangeDescription());
                }

                return existingOperationHistory;
            })
            .map(operationHistoryRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OperationHistory> findAll() {
        log.debug("Request to get all OperationHistories");
        List<OperationHistory> allOperations = this.operationHistoryRepository.findAll();
        List<OperationHistory> returnList = new ArrayList<>();
        for (OperationHistory operationHistory : allOperations) {
            if (operationHistory.getDeleted() == null) {
                returnList.add(operationHistory);
            }
        }
        return returnList;
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<OperationHistory> findOne(Long id) {
        log.debug("Request to get OperationHistory : {}", id);
        return operationHistoryRepository.findById(id);
    }

    @Override
    public Boolean delete(Long id) {
        log.debug("Request to delete OperationHistory : {}", id);
        Optional<OperationHistory> operationHistory = operationHistoryRepository.findById(id);
        if (operationHistory.isPresent()) {
            operationHistory.get().setDeleted(true);
            operationHistoryRepository.save(operationHistory.get());
            return true;
        } else {
            return false;
        }
    }
}
