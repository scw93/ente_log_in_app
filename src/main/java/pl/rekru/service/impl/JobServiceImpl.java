package pl.rekru.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.rekru.domain.Job;
import pl.rekru.repository.JobRepository;
import pl.rekru.service.JobService;

/**
 * Service Implementation for managing {@link Job}.
 */
@Service
@Transactional
public class JobServiceImpl implements JobService {

    private final Logger log = LoggerFactory.getLogger(JobServiceImpl.class);

    private final JobRepository jobRepository;

    public JobServiceImpl(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @Override
    public Job save(Job job) {
        log.debug("Request to save Job : {}", job);
        return jobRepository.save(job);
    }

    @Override
    public Job update(Job job) {
        log.debug("Request to update Job : {}", job);
        return jobRepository.save(job);
    }

    @Override
    public Optional<Job> partialUpdate(Job job) {
        log.debug("Request to partially update Job : {}", job);

        return jobRepository
            .findById(job.getId())
            .map(existingJob -> {
                if (job.getJobTitle() != null) {
                    existingJob.setJobTitle(job.getJobTitle());
                }

                return existingJob;
            })
            .map(jobRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Job> findAll() {
        return jobRepository.findAllNotDeletedJobs();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Job> findOne(Long id) {
        log.debug("Request to get Job : {}", id);
        return jobRepository.findById(id);
    }

    @Override
    public Boolean delete(Long id) {
        log.debug("Request to delete Job : {}", id);
        Optional<Job> job = jobRepository.findById(id);
        if (job.isPresent()) {
            job.get().setDeleted(true);
            jobRepository.save(job.get());
            return true;
        } else {
            return false;
        }
    }
}
