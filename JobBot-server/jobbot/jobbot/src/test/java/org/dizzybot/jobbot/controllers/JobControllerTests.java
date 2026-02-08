package org.dizzybot.jobbot.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.dizzybot.jobbot.controllers.job.JobController;
import org.dizzybot.jobbot.controllers.job.requests.Job.Job;
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
        request.setJobTitle("title");
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
                .andExpect(content().json("{\"status\":\"success\",\"message\":\"Job created\"}"));
    }

    @Test
    public void testGetJob() throws Exception {
        ResultActions resultActions = mockMvc.perform(get("/api/job/get"));

        resultActions.andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    public void testUploadImageSuccess() throws Exception {
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
                .andExpect(content().json("{\"status\":\"success\",\"message\":\"Job image uploaded\"}"));
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
        request.setJobTitle("title");
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
    public void testCreateJobWhenUserNotFound() throws Exception {
        Job request = new Job();
        request.setJobTitle("title");
        request.setLocation("location");
        request.setPay(2000);
        request.setTime(LocalDateTime.now());
        request.setDescription("description");

        String bodyJson = objectMapper.writeValueAsString(request);

        when(userService.findById(Mockito.any())).thenReturn(null);

        mockMvc.perform(post("/api/job/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(bodyJson))
                .andExpect(status().is5xxServerError());
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
    public void testUploadImageWhenJobNotFound() throws Exception {
        MockMultipartFile mockFile = new MockMultipartFile(
                "file",
                "image.jpeg",
                "image/jpeg",
                "1234567890".getBytes()
        );

        when(jobService.findById(Mockito.any())).thenReturn(null);

        mockMvc.perform(multipart("/api/job/uploadImage/1")
                .file(mockFile)
                .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().is5xxServerError());
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

}
