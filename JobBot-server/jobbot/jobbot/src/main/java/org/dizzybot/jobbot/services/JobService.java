package org.dizzybot.jobbot.services;

import org.dizzybot.jobbot.entities.Job;

import java.util.List;

public interface JobService {

    public Job saveJob(Job job);

    public List<Job> getAllJob();

    public Job findById(Long id);

    public void deleteJob(Long id);

}
