package org.dizzybot.jobbot.controllers.job;

import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import org.dizzybot.jobbot.controllers.general.responses.GeneralResponse;
import org.dizzybot.jobbot.controllers.general.responses.ResponseStatusEnum;
import org.dizzybot.jobbot.controllers.job.messages.JobControllerMessage;
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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/job")
@CrossOrigin(origins = "http://localhost:4200") // Dev config, to be deleted in PROD
@Tag(name = "Job", description = "Job management endpoints")
public class JobController {

    @Autowired
    private JobService jobService;

    @Autowired
    private UserService userService;

    @Operation(summary = "Create a job", description = "Creates a new job posted by a user",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Job request", required = true))
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Job created", content = @Content(schema = @Schema(implementation = GeneralResponse.class)))
    })
    @PostMapping("/create")
    public ResponseEntity<GeneralResponse> create(@org.springframework.web.bind.annotation.RequestBody Job request) {
        User user = userService.findById(request.getUserId());
        org.dizzybot.jobbot.entities.Job job = new org.dizzybot.jobbot.entities.Job(request.getJobTitle(), request.getPay(), request.getLocation(), request.getTime(), request.getDescription(), user);
        user.getJobPosted().add(job);

        jobService.saveJob(job);
        userService.saveUser(user);

        return new ResponseEntity<>(new GeneralResponse(ResponseStatusEnum.SUCCESS, JobControllerMessage.JOB_CREATED.getMessage(), job.getId()), HttpStatus.CREATED);
    }

    @Operation(summary = "Get all jobs", description = "Returns a list of all jobs")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK")
    })
    @GetMapping("/get")
    public ResponseEntity<List<org.dizzybot.jobbot.entities.Job>> get() {
        return new ResponseEntity<>(jobService.getAllJob(), HttpStatus.OK);
    }

    @Operation(summary = "Update a job", description = "Updates an existing job",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Job request", required = true))
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Job updated", content = @Content(schema = @Schema(implementation = GeneralResponse.class)))
    })
    @PostMapping("/update")
    public ResponseEntity<GeneralResponse> update(@org.springframework.web.bind.annotation.RequestBody Job body) {
        org.dizzybot.jobbot.entities.Job job = jobService.findById(body.getId());

        job.setTitle(body.getJobTitle());
        job.setPay(body.getPay());
        job.setLocation(body.getLocation());
        job.setTime(body.getTime());
        job.setDescription(body.getDescription());
        jobService.saveJob(job);

        return new ResponseEntity<>(new GeneralResponse(ResponseStatusEnum.SUCCESS, JobControllerMessage.JOB_UPDATED.getMessage(), job.getId()), HttpStatus.OK);
    }

    @Operation(summary = "Delete a job", description = "Deletes a job by its ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Job deleted", content = @Content(schema = @Schema(implementation = GeneralResponse.class)))
    })
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<GeneralResponse> delete(@Parameter(description = "ID of the job", required = true) @PathVariable Long id) {
        jobService.deleteJob(id);
        return new ResponseEntity<>(new GeneralResponse(ResponseStatusEnum.SUCCESS, JobControllerMessage.JOB_DELETED.getMessage()), HttpStatus.OK);
    }

    @Operation(summary = "Get jobs posted by a user", description = "Returns a list of jobs posted by the specified user")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = org.dizzybot.jobbot.entities.Job.class))),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content)
    })
    @GetMapping("/get/{userId}")
    public ResponseEntity<List<org.dizzybot.jobbot.entities.Job>> getJobPostedByUserId(@Parameter(description = "ID of the user", required = true) @PathVariable Long userId) {
        User user = userService.findById(userId);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<org.dizzybot.jobbot.entities.Job> jobs = user.getJobPosted();
        return new ResponseEntity<>(jobs, HttpStatus.OK);
    }

    @Operation(summary = "Upload image for a job", description = "Uploads an image and associates it with the specified job")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Image uploaded", content = @Content(schema = @Schema(implementation = GeneralResponse.class)))
    })
    @PostMapping("/uploadImage/{id}")
    public ResponseEntity<GeneralResponse> uploadImage(
            @Parameter(description = "Image file to upload", required = true) @RequestParam("file") MultipartFile file,
            @Parameter(description = "ID of the job", required = true) @PathVariable Long id) throws IOException {
        org.dizzybot.jobbot.entities.Job job = jobService.findById(id);
        JobImage image = new JobImage(file.getBytes());
        job.getImages().add(image);
        image.setJob(job);
        jobService.saveJob(job);
        return new ResponseEntity<>(new GeneralResponse(ResponseStatusEnum.SUCCESS, JobControllerMessage.IMAGE_UPLOADED.getMessage()), HttpStatus.OK);
    }

    @DeleteMapping("/deleteImage/{jobId}/{imageId}")
    @Operation(summary = "Delete an image from a job", description = "Deletes an image by its ID from a specific job")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Image deleted", content = @Content(schema = @Schema(implementation = GeneralResponse.class)))
    })
    public ResponseEntity<GeneralResponse> deleteImage(
            @Parameter(description = "ID of the job", required = true) @PathVariable Long jobId,
            @Parameter(description = "ID of the image", required = true) @PathVariable Long imageId) {
        org.dizzybot.jobbot.entities.Job job = jobService.findById(jobId);
        job.getImages().removeIf(image -> image.getId().equals(imageId));
        jobService.saveJob(job);
        return new ResponseEntity<>(new GeneralResponse(ResponseStatusEnum.SUCCESS, JobControllerMessage.IMAGE_DELETED.getMessage()), HttpStatus.OK);
    }

    @Operation(summary = "Get job images", description = "Returns images for a specific job")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK")
    })
    @GetMapping("/get/{id}/images")
    public ResponseEntity<List<JobImage>> getJobImages(@Parameter(description = "ID of the job", required = true) @PathVariable Long id) {
        org.dizzybot.jobbot.entities.Job job = jobService.findById(id);
        return new ResponseEntity<>(job.getImages(), HttpStatus.OK);
    }

}
