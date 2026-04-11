package org.dizzybot.jobbot.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.dizzybot.jobbot.controllers.general.responses.ResponseStatusEnum;
import org.dizzybot.jobbot.controllers.job.JobController;
import org.dizzybot.jobbot.controllers.job.messages.JobControllerMessage;
import org.dizzybot.jobbot.controllers.job.requests.Job;
import org.dizzybot.jobbot.entities.JobImage;
import org.dizzybot.jobbot.entities.User;
import org.dizzybot.jobbot.services.JobService;
import org.dizzybot.jobbot.services.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(JobController.class)
public class JobControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UserService userService;

    @MockBean
    private JobService jobService;

    @InjectMocks
    private JobController jobController;

    @Test
    public void testCreateJobSuccess() throws Exception {
        Job request = new Job();
        request.setTitle("title");
        request.setLocation("location");
        request.setPay(2000);
        request.setTime(LocalDateTime.now());
        request.setDescription("description");

        String bodyJson = objectMapper.writeValueAsString(request);

        User user = new User("username", "password", "email@mail.com");
        user.setId(1L);

        when(userService.findById(Mockito.any())).thenReturn(user);

        ResultActions resultActions = mockMvc.perform(post("/api/job/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(bodyJson));

        resultActions.andExpect(status().isCreated())
                .andExpect(jsonPath("$.status").value(ResponseStatusEnum.SUCCESS.toString()))
                .andExpect(jsonPath("$.message").value(JobControllerMessage.JOB_CREATED.getMessage()));
    }

    @Test
    public void testGetJob() throws Exception {
        ResultActions resultActions = mockMvc.perform(get("/api/job/get"));

        resultActions.andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    public void testGetJobPostedByUserId() throws Exception {
        User user = new User("username", "password", "email@mail.com");
        user.setId(1L);

        List<org.dizzybot.jobbot.entities.Job> jobPosted = new ArrayList<>();
        org.dizzybot.jobbot.entities.Job job = new org.dizzybot.jobbot.entities.Job("Title", 50D, "Sydney", LocalDateTime.now(), "Description", user);
        job.setId(1L);
        jobPosted.add(job);
        user.setJobPosted(jobPosted);

        when(userService.findById(Mockito.any())).thenReturn(user);

        ResultActions resultActions = mockMvc.perform(get("/api/job/get/1"));

        resultActions.andExpect(status().isOk());
        List<org.dizzybot.jobbot.entities.Job> result = objectMapper.readValue(resultActions.andReturn().getResponse().getContentAsString(), new TypeReference<>() {
        });
        job.setEmployer(null);
        List<org.dizzybot.jobbot.entities.Job> expectedJobPosted = new ArrayList<>();
        expectedJobPosted.add(job);
        assertTrue(expectedJobPosted.get(0).equals(result.get(0)));
    }

    @Test
    public void testUploadImageSUCCESS() throws Exception {
        MockMultipartFile mockFile = new MockMultipartFile(
                "file",
                "image.jpeg",
                "image/jpeg",
                "1234567890".getBytes()
        );

        when(jobService.findById(Mockito.any())).thenReturn(new org.dizzybot.jobbot.entities.Job());

        ResultActions resultActions = mockMvc.perform(multipart("/api/job/uploadImage/1")
                .file(mockFile)
                .contentType(MediaType.MULTIPART_FORM_DATA));

        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(ResponseStatusEnum.SUCCESS.toString()))
                .andExpect(jsonPath("$.message").value(JobControllerMessage.IMAGE_UPLOADED.getMessage()));
    }

    @Test
    public void testGetJobImages() throws Exception {
        org.dizzybot.jobbot.entities.Job job = new org.dizzybot.jobbot.entities.Job();
        JobImage image = new JobImage();
        image.setId(1L);
        image.setImage("12345".getBytes());
        image.setJob(job);
        job.getImages().add(image);

        when(jobService.findById(Mockito.any())).thenReturn(job);

        ResultActions resultActions = mockMvc.perform(get("/api/job/get/1/images"));

        resultActions.andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    public void testCreateJobCallsServices() throws Exception {
        Job request = new Job();
        request.setTitle("title");
        request.setLocation("location");
        request.setPay(2000);
        request.setTime(LocalDateTime.now());
        request.setDescription("description");

        String bodyJson = objectMapper.writeValueAsString(request);

        User user = new User("username", "password", "email@mail.com");
        user.setId(1L);

        when(userService.findById(Mockito.any())).thenReturn(user);

        mockMvc.perform(post("/api/job/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(bodyJson))
                .andExpect(status().isCreated());

        Mockito.verify(jobService).saveJob(Mockito.any());
        Mockito.verify(userService).saveUser(Mockito.any());
    }

    @Test
    public void testUploadImageSavesImage() throws Exception {
        MockMultipartFile mockFile = new MockMultipartFile(
                "file",
                "image.jpeg",
                "image/jpeg",
                "1234567890".getBytes()
        );

        when(jobService.findById(Mockito.any())).thenReturn(new org.dizzybot.jobbot.entities.Job());

        mockMvc.perform(multipart("/api/job/uploadImage/1")
                .file(mockFile)
                .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isOk());

        Mockito.verify(jobService).saveJob(Mockito.any());
    }

    @Test
    public void testGetJobWithOneEntry() throws Exception {
        when(jobService.getAllJob()).thenReturn(java.util.Collections.singletonList(new org.dizzybot.jobbot.entities.Job()));

        mockMvc.perform(get("/api/job/get"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    public void testUpdateJobSuccess() throws Exception {
        Job request = new Job();
        request.setId(1L);
        request.setTitle("new title");
        request.setLocation("new location");
        request.setPay(1500);
        request.setTime(LocalDateTime.now());
        request.setDescription("new description");

        org.dizzybot.jobbot.entities.Job existing = new org.dizzybot.jobbot.entities.Job("old", 1000D, "oldloc", LocalDateTime.now(), "old", new User());
        existing.setId(1L);

        when(jobService.findById(Mockito.any())).thenReturn(existing);

        String bodyJson = objectMapper.writeValueAsString(request);

        mockMvc.perform(post("/api/job/update")
                .contentType(MediaType.APPLICATION_JSON)
                .content(bodyJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(ResponseStatusEnum.SUCCESS.toString()))
                .andExpect(jsonPath("$.message").value(JobControllerMessage.JOB_UPDATED.getMessage()));

        Mockito.verify(jobService).saveJob(Mockito.any());
    }

    @Test
    public void testDeleteJobSuccess() throws Exception {
        mockMvc.perform(delete("/api/job/delete/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(ResponseStatusEnum.SUCCESS.toString()))
                .andExpect(jsonPath("$.message").value(JobControllerMessage.JOB_DELETED.getMessage()));

        Mockito.verify(jobService).deleteJob(Mockito.eq(1L));
    }

    @Test
    public void testDeleteImageSuccess() throws Exception {
        org.dizzybot.jobbot.entities.Job job = new org.dizzybot.jobbot.entities.Job();
        JobImage image = new JobImage();
        image.setId(2L);
        image.setImage("data".getBytes());
        image.setJob(job);
        job.getImages().add(image);

        when(jobService.findById(Mockito.any())).thenReturn(job);

        mockMvc.perform(delete("/api/job/deleteImage/1/2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(ResponseStatusEnum.SUCCESS.toString()))
                .andExpect(jsonPath("$.message").value(JobControllerMessage.IMAGE_DELETED.getMessage()));

        // image should be removed and job saved
        assertEquals(0, job.getImages().size());
        Mockito.verify(jobService).saveJob(Mockito.any());
    }

    @Test
    public void testAcceptJobSuccess() throws Exception {
        org.dizzybot.jobbot.entities.Job job = new org.dizzybot.jobbot.entities.Job();
        job.setId(1L);

        User employer = new User("employer", "password", "email@mail.com");
        employer.setId(1L);
        job.setEmployer(employer);

        User employee = new User("employee", "password", "employee@mail.com");
        employee.setId(2L);

        when(jobService.findById(1L)).thenReturn(job);
        when(userService.findById(2L)).thenReturn(employee);

        mockMvc.perform(post("/api/job/accept/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(ResponseStatusEnum.SUCCESS.toString()))
                .andExpect(jsonPath("$.message").value(JobControllerMessage.JOB_ACCEPTED.getMessage()));

        Mockito.verify(jobService).saveJob(Mockito.any());
    }

    @Test
    public void testAcceptJobSameAsPosterFails() throws Exception {
        org.dizzybot.jobbot.entities.Job job = new org.dizzybot.jobbot.entities.Job();
        job.setId(1L);

        User user = new User("user", "password", "email@mail.com");
        user.setId(1L);
        job.setEmployer(user);

        when(jobService.findById(1L)).thenReturn(job);
        when(userService.findById(1L)).thenReturn(user);

        mockMvc.perform(post("/api/job/accept/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("1"))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.status").value(ResponseStatusEnum.ERROR.toString()))
                .andExpect(jsonPath("$.message").value(JobControllerMessage.JOB_CANNOT_BE_ACCEPTED_SAME_AS_POSTER.getMessage()));
    }

    @Test
    public void testGetJobsAcceptedByUserIdSuccess() throws Exception {
        User user = new User("username", "password", "email@mail.com");
        user.setId(1L);

        List<org.dizzybot.jobbot.entities.Job> jobAccepted = new ArrayList<>();
        org.dizzybot.jobbot.entities.Job job = new org.dizzybot.jobbot.entities.Job("Title", 50D, "Sydney", LocalDateTime.now(), "Description", new User());
        job.setId(1L);
        jobAccepted.add(job);
        user.setJobAccepted(jobAccepted);

        when(userService.findById(1L)).thenReturn(user);

        mockMvc.perform(get("/api/job/get/1/accepted")
                .param("userId", "1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    public void testGetJobsAcceptedByUserIdNotFound() throws Exception {
        when(userService.findById(Mockito.any())).thenReturn(null);

        mockMvc.perform(get("/api/job/get/1/accepted")
                .param("userId", "1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testAddCommentSuccess() throws Exception {
        org.dizzybot.jobbot.entities.Job job = new org.dizzybot.jobbot.entities.Job();
        job.setId(1L);

        User author = new User("author", "password", "author@mail.com");
        author.setId(1L);

        User replyToUser = new User("replyto", "password", "replyto@mail.com");
        replyToUser.setId(2L);

        when(jobService.findById(1L)).thenReturn(job);
        when(userService.findById(1L)).thenReturn(author);
        when(userService.findById(2L)).thenReturn(replyToUser);

        String commentJson = "{\"content\":\"Great job!\",\"authorId\":1,\"replyToUserId\":2}";

        mockMvc.perform(post("/api/job/addComment/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(commentJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(ResponseStatusEnum.SUCCESS.toString()))
                .andExpect(jsonPath("$.message").value(JobControllerMessage.COMMENT_ADDED.getMessage()));

        Mockito.verify(jobService).saveJob(Mockito.any());
    }

    @Test
    public void testDeleteCommentSuccess() throws Exception {
        org.dizzybot.jobbot.entities.Job job = new org.dizzybot.jobbot.entities.Job();
        job.setId(1L);

        User author = new User("author", "password", "author@mail.com");
        author.setId(1L);

        User employer = new User("employer", "password", "employer@mail.com");
        employer.setId(2L);
        job.setEmployer(employer);

        org.dizzybot.jobbot.entities.JobComment comment = new org.dizzybot.jobbot.entities.JobComment();
        comment.setId(1L);
        comment.setAuthor(author);
        job.getComments().add(comment);

        when(jobService.findById(1L)).thenReturn(job);

        mockMvc.perform(delete("/api/job/deleteComment/1/1/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(ResponseStatusEnum.SUCCESS.toString()))
                .andExpect(jsonPath("$.message").value(JobControllerMessage.COMMENT_DELETED.getMessage()));

        Mockito.verify(jobService).saveJob(Mockito.any());
    }

    @Test
    public void testSetJobStatusSuccess() throws Exception {
        org.dizzybot.jobbot.entities.Job job = new org.dizzybot.jobbot.entities.Job();
        job.setId(1L);

        when(jobService.findById(1L)).thenReturn(job);

        String bodyJson = "{\"status\":\"COMPLETED\"}";

        mockMvc.perform(post("/api/job/setStatus/1")
                        .param("id", "1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(bodyJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(ResponseStatusEnum.SUCCESS.toString()))
                .andExpect(jsonPath("$.message").value(JobControllerMessage.JOB_STATUS_UPDATED.getMessage()));

        Mockito.verify(jobService).saveJob(Mockito.any());
    }

}
