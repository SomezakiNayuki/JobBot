package org.dizzybot.jobbot.controllers.job;

import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import org.dizzybot.jobbot.controllers.general.responses.GeneralResponse;
import org.dizzybot.jobbot.controllers.general.responses.ResponseStatusEnum;
import org.dizzybot.jobbot.controllers.job.messages.JobControllerMessage;
import org.dizzybot.jobbot.controllers.job.requests.Job;
import org.dizzybot.jobbot.controllers.job.requests.JobComment;
import org.dizzybot.jobbot.entities.JobImage;
import org.dizzybot.jobbot.entities.User;
import org.dizzybot.jobbot.enums.JobStatusEnum;
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
import java.util.Map;

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
        org.dizzybot.jobbot.entities.Job job = new org.dizzybot.jobbot.entities.Job(request.getTitle(), request.getPay(), request.getLocation(), request.getTime(), request.getDescription(), user);
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
    public ResponseEntity<GeneralResponse> update(@RequestBody Job body) {
        org.dizzybot.jobbot.entities.Job job = jobService.findById(body.getId());

        job.setTitle(body.getTitle());
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
    public ResponseEntity<List<org.dizzybot.jobbot.entities.Job>> getJobsPostedByUserId(@Parameter(description = "ID of the user", required = true) @PathVariable Long userId) {
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

    @Operation(summary = "Delete an image from a job", description = "Deletes an image by its ID from a specific job")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Image deleted", content = @Content(schema = @Schema(implementation = GeneralResponse.class)))
    })
    @DeleteMapping("/deleteImage/{jobId}/{imageId}")
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

    @Operation(summary = "Accept a job", description = "Employee takes the ownership of the job and start working on it")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Job accepted successfully", content = @Content(schema = @Schema(implementation = GeneralResponse.class))),
            @ApiResponse(responseCode = "500", description = "Job cannot be accepted due to same as poster", content = @Content(schema = @Schema(implementation = GeneralResponse.class)))
    })
    @PostMapping("/accept/{id}")
    public ResponseEntity<GeneralResponse> acceptJob(
            @Parameter(description = "ID of the job", required = true) @PathVariable Long id,
            @Parameter(description = "ID of the user", required = true) @RequestBody Long userId) {
        org.dizzybot.jobbot.entities.Job job = jobService.findById(id);
        User employee = userService.findById(userId);

        if (job.getEmployer().isSamePerson(employee)) {
            return new ResponseEntity<>(new GeneralResponse(ResponseStatusEnum.ERROR, JobControllerMessage.JOB_CANNOT_BE_ACCEPTED_SAME_AS_POSTER.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        job.setEmployee(employee);
        job.setJobStatusEnum(JobStatusEnum.IN_PROGRESS);
        jobService.saveJob(job);
        return new ResponseEntity<>(new GeneralResponse(ResponseStatusEnum.SUCCESS, JobControllerMessage.JOB_ACCEPTED.getMessage()), HttpStatus.OK);
    }

    @Operation(summary = "Get jobs accepted by a user", description = "Returns a list of jobs accepted by the specified user")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = org.dizzybot.jobbot.entities.Job.class))),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content)
    })
    @GetMapping("/get/{userId}/accepted")
    public ResponseEntity<List<org.dizzybot.jobbot.entities.Job>> getJobsAcceptedByUserId(
            @Parameter(description = "ID of the user", required = true) @RequestParam Long userId) {
        User user = userService.findById(userId);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<org.dizzybot.jobbot.entities.Job> jobs = user.getJobAccepted();
        return new ResponseEntity<>(jobs, HttpStatus.OK);
    }

    @Operation(summary = "Add a comment to a job", description = "User can post a comment to a job")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Comment added successfully", content = @Content(schema = @Schema(implementation = GeneralResponse.class))),
    })
    @PostMapping("/addComment/{id}")
    public ResponseEntity<GeneralResponse> addComment(
            @Parameter(description = "ID of the job", required = true) @PathVariable Long id,
            @RequestBody JobComment comment) {
        org.dizzybot.jobbot.entities.Job job = jobService.findById(id);
        User author = userService.findById(comment.getAuthorId());
        User replyToUser = userService.findById(comment.getReplyToUserId());

        job.getComments().add(new org.dizzybot.jobbot.entities.JobComment(comment.getContent(), job, author, replyToUser));
        jobService.saveJob(job);

        return new ResponseEntity<>(new GeneralResponse(ResponseStatusEnum.SUCCESS, JobControllerMessage.COMMENT_ADDED.getMessage()), HttpStatus.OK);
    }

    @Operation(summary = "Delete a comment from a job", description = "User can delete a comment from a job if they are the author or the job poster")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Comment deleted successfully", content = @Content(schema = @Schema(implementation = GeneralResponse.class))),
    })
    @DeleteMapping("/deleteComment/{jobId}/{userId}/{commentId}")
    public ResponseEntity<GeneralResponse> deleteComment(
            @Parameter(description = "ID of the job", required = true) @PathVariable Long jobId,
            @Parameter(description = "ID of the user", required = true) @PathVariable Long userId,
            @Parameter(description = "ID of the comment", required = true) @PathVariable Long commentId) {
        org.dizzybot.jobbot.entities.Job job = jobService.findById(jobId);
        job.getComments().removeIf(comment -> comment.getId().equals(commentId) && (comment.getAuthor().getId().equals(userId) || job.getEmployer().getId().equals(userId)));
        jobService.saveJob(job);

        return new ResponseEntity<>(new GeneralResponse(ResponseStatusEnum.SUCCESS, JobControllerMessage.COMMENT_DELETED.getMessage()), HttpStatus.OK);
    }

    @Operation(summary = "Update job status", description = "Push job to status")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Job status updated successfully", content = @Content(schema = @Schema(implementation = GeneralResponse.class))),
    })
    @PostMapping("/setStatus/{id}")
    public ResponseEntity<GeneralResponse> setJobStatus(@RequestParam Long id, @RequestBody Map<String, Object> body) {
        org.dizzybot.jobbot.entities.Job job = jobService.findById(id);
        JobStatusEnum statusEnum = JobStatusEnum.valueOf((String) body.get("status"));
        job.setJobStatusEnum(statusEnum);
        jobService.saveJob(job);
        return new ResponseEntity<>(new GeneralResponse(ResponseStatusEnum.SUCCESS, JobControllerMessage.JOB_STATUS_UPDATED.getMessage()), HttpStatus.OK);
    }

}
