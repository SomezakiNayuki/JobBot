package org.dizzybot.jobbot.repositories;

import org.dizzybot.jobbot.entities.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<Job, Integer> {

    Job findById(Long id);

}
