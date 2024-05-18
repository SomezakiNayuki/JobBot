package org.dizzybot.jobbot.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.dizzybot.jobbot.entities.User;
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
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
public class UserControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @Test
    public void testCreateUserSuccess() throws Exception {
        String username = "testUsername";
        String password = "testPassword";
        String email = "test@email.com";

        Map<Object, Object> body = new HashMap<>();
        body.put("username", username);
        body.put("password", password);
        body.put("email", email);

        String bodyJson = objectMapper.writeValueAsString(body);

        User user = new User(username, password, email);
        user.setId(1L);

        when(userService.saveUser(Mockito.any())).thenReturn(user);

        ResultActions resultActions = mockMvc.perform(post("/api/user/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(bodyJson));

        resultActions.andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.username").value(username))
                .andExpect(jsonPath("$.email").value(email))
                .andExpect(jsonPath("$.created_at").value(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS).toString()));
    }

    @Test
    public void testCreateUserFailure() throws Exception {
        String username = "testUsername";
        String password = "testPassword";
        String email = "test@email.com";

        Map<Object, Object> body = new HashMap<>();
        body.put("username", username);
        body.put("password", password);
        body.put("email", email);

        String bodyJson = objectMapper.writeValueAsString(body);

        when(userService.saveUser(Mockito.any())).thenThrow(new RuntimeException());

        ResultActions resultActions = mockMvc.perform(post("/api/user/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(bodyJson));

        resultActions.andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value("error"))
                .andExpect(jsonPath("$.message").value("Email already registered"));
    }

}
