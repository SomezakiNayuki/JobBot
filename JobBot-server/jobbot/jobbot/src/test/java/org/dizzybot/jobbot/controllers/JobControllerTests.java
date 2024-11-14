package org.dizzybot.jobbot.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.dizzybot.jobbot.controllers.job.JobController;
import org.dizzybot.jobbot.controllers.job.requests.CreateJobRequest;
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
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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

}
