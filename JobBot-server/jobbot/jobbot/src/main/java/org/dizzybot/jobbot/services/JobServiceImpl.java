package org.dizzybot.jobbot.services;

import org.dizzybot.jobbot.entities.Job;
import org.dizzybot.jobbot.repositories.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(propagation = Propagation.SUPPORTS)
public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepository jobRepository;

    @Transactional(propagation = Propagation.REQUIRED)
    public Job saveJob(Job job) {
        return jobRepository.save(job);
    }

    public List<Job> getAllJob() {
        return jobRepository.findAll();
    }

    public Job findById(Long id) {
        return jobRepository.findById(id);
    }

}
