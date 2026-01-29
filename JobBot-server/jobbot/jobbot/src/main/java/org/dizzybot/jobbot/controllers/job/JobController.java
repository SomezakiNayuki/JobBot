package org.dizzybot.jobbot.controllers.job;

import org.dizzybot.jobbot.controllers.general.responses.GeneralResponse;
import org.dizzybot.jobbot.controllers.job.requests.Job;
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
    public ResponseEntity create(@RequestBody Job body) {
        User user = userService.findById(body.getUserId());
        org.dizzybot.jobbot.entities.Job job = new org.dizzybot.jobbot.entities.Job(body.getJobTitle(), body.getPay(), body.getLocation(), body.getTime(), body.getDescription(), user);
        user.getJobPosted().add(job);

        jobService.saveJob(job);
        userService.saveUser(user);

        return new ResponseEntity(new GeneralResponse("success", "Job created", job.getId()), HttpStatus.CREATED);
    }

    @GetMapping("/get")
    public ResponseEntity<List<org.dizzybot.jobbot.entities.Job>> get() {
        return new ResponseEntity(jobService.getAllJob(), HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity update(@RequestBody Job body) {
        org.dizzybot.jobbot.entities.Job job = jobService.findById(body.getId());
        job.setTitle(body.getJobTitle());
        job.setPay(body.getPay());
        job.setLocation(body.getLocation());
        job.setTime(body.getTime());
        job.setDescription(body.getDescription());
        jobService.saveJob(job);
        return new ResponseEntity(new GeneralResponse("success", "Job updated", job.getId()), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        jobService.deleteJob(id);
        return new ResponseEntity(new GeneralResponse("success", "Job deleted"), HttpStatus.OK);
    }

    @GetMapping("/get/{userId}")
    public ResponseEntity<List<org.dizzybot.jobbot.entities.Job>> getJobPostedByUserId(@PathVariable Long userId) {
        User user = userService.findById(userId);
        List<org.dizzybot.jobbot.entities.Job> jobs = user.getJobPosted();
        return new ResponseEntity(jobs, HttpStatus.OK);
    }

    @PostMapping("/uploadImage/{id}")
    public ResponseEntity uploadImage(@RequestParam("file") MultipartFile file, @PathVariable Long id) {
        org.dizzybot.jobbot.entities.Job job = jobService.findById(id);
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

    @DeleteMapping("/deleteImage/{jobId}/{imageId}")
    public ResponseEntity deleteImage(@PathVariable Long jobId, @PathVariable Long imageId) {
        org.dizzybot.jobbot.entities.Job job = jobService.findById(jobId);
        job.getImages().removeIf(image -> image.getId().equals(imageId));
        jobService.saveJob(job);
        return new ResponseEntity(new GeneralResponse("success", "Job image deleted"), HttpStatus.OK);
    }

    @GetMapping("/get/{id}/images")
    public ResponseEntity<List<JobImage>> getJobImages(@PathVariable Long id) {
        org.dizzybot.jobbot.entities.Job job = jobService.findById(id);
        return new ResponseEntity(job.getImages(), HttpStatus.OK);
    }

}
