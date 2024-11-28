package org.dizzybot.jobbot.controllers.job;

import org.dizzybot.jobbot.controllers.general.responses.GeneralResponse;
import org.dizzybot.jobbot.controllers.job.requests.CreateJobRequest;
import org.dizzybot.jobbot.entities.Job;
import org.dizzybot.jobbot.entities.JobImage;
import org.dizzybot.jobbot.entities.User;
import org.dizzybot.jobbot.services.JobService;
import org.dizzybot.jobbot.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

        return new ResponseEntity(new GeneralResponse("success", "Job created", job.getId()), HttpStatus.CREATED);
    }

    @GetMapping("/get")
    public ResponseEntity<List<Job>> get() {
        return new ResponseEntity(jobService.getAllJob(), HttpStatus.OK);
    }

    @PostMapping("/uploadImage/{id}")
    public ResponseEntity uploadImage(@RequestParam("file") MultipartFile file, @PathVariable Long id) {
        Job job = jobService.findById(id);
        try {
            JobImage image = new JobImage(file.getBytes());
            job.getImages().add(image);
            image.setJob(job);
            jobService.saveJob(job);
            return new ResponseEntity(new GeneralResponse("success", "Job image uploaded"), HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(new GeneralResponse("error", "Image upload failed"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get/{id}/images")
    public ResponseEntity<List<JobImage>> getJobImages(@PathVariable Long id) {
        Job job = jobService.findById(id);
        return new ResponseEntity(job.getImages(), HttpStatus.OK);
    }

}
