package org.dizzybot.jobbot.controllers.job;

import org.dizzybot.jobbot.controllers.general.responses.GeneralResponse;
import org.dizzybot.jobbot.controllers.job.requests.CreateJobRequest;
import org.dizzybot.jobbot.entities.Job;
import org.dizzybot.jobbot.entities.User;
import org.dizzybot.jobbot.services.JobService;
import org.dizzybot.jobbot.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job")
@CrossOrigin(origins = "http://localhost:4200") // Dev config, to be deleted in PROD
public class JobController {

    @Autowired
    private JobService jobService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity create(@RequestBody CreateJobRequest request) {
        User user = userService.findById(request.getUserId());
        Job job = new Job(request.getJobTitle(), request.getPay(), request.getLocation(), request.getTime(), request.getDescription(), user);
        user.getJobPosted().add(job);

        jobService.saveJob(job);
        userService.saveUser(user);

        return new ResponseEntity(new GeneralResponse("success", "Job created"), HttpStatus.CREATED);
    }

    @GetMapping("/get")
    public ResponseEntity<List<Job>> get() {
        return new ResponseEntity(jobService.getAllJob(), HttpStatus.OK);
    }


    @GetMapping("/get/{id}")
    public ResponseEntity<Job> getById(@PathVariable Long id) {
        return new ResponseEntity(jobService.findById(id), HttpStatus.OK);
    }
}
