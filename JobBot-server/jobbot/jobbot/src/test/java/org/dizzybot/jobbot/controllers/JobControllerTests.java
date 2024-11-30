package org.dizzybot.jobbot.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.dizzybot.jobbot.controllers.job.JobController;
import org.dizzybot.jobbot.controllers.job.requests.CreateJobRequest;
import org.dizzybot.jobbot.entities.Job;
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
        CreateJobRequest request = new CreateJobRequest();
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

        when(jobService.findById(Mockito.any())).thenReturn(new Job());

        ResultActions resultActions = mockMvc.perform(multipart("/api/job/uploadImage/1")
                .file(mockFile)
                .contentType(MediaType.MULTIPART_FORM_DATA));

        resultActions.andExpect(status().isOk())
                .andExpect(content().json("{\"status\":\"success\",\"message\":\"Job image uploaded\"}"));
    }

    @Test
    public void testGetJobImages() throws Exception {
        Job job = new Job();
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

}
