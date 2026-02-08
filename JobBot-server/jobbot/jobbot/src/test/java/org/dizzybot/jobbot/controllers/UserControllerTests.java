package org.dizzybot.jobbot.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.dizzybot.jobbot.controllers.user.UserController;
import org.dizzybot.jobbot.controllers.user.messages.UserControllerMessage;
import org.dizzybot.jobbot.controllers.user.requests.AuthenticateUserRequest;
import org.dizzybot.jobbot.controllers.user.requests.CreateUserRequest;
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

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

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

        CreateUserRequest request = new CreateUserRequest();
        request.setUsername(username);
        request.setPassword(password);
        request.setEmail(email);

        String bodyJson = objectMapper.writeValueAsString(request);

        User user = new User(username, password, email);
        user.setId(1L);

        when(userService.saveUser(Mockito.any())).thenReturn(user);

        ResultActions resultActions = mockMvc.perform(post("/api/user/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(bodyJson));

        resultActions.andExpect(status().isCreated())
                .andExpect(content().json("{\"status\":\"success\",\"message\":\"User created\",\"payload\":{\"userId\":1}}"));
    }

    @Test
    public void testCreateUserFailure_EmailOccupied() throws Exception {
        String username = "testUsername";
        String password = "testPassword";
        String email = "test@email.com";

        CreateUserRequest request = new CreateUserRequest();
        request.setUsername(username);
        request.setPassword(password);
        request.setEmail(email);

        String bodyJson = objectMapper.writeValueAsString(request);

        // Simulate existing email
        when(userService.findByEmail(Mockito.anyString())).thenReturn(new User());

        ResultActions resultActions = mockMvc.perform(post("/api/user/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(bodyJson));

        resultActions.andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.status").value("error"))
                .andExpect(jsonPath("$.message").value(UserControllerMessage.EMAIL_OCCUPIED.toString()));
    }

    @Test
    public void testAuthenticateUserSuccess() throws Exception {
        String email = "test@email.com";
        String username = "testUsername";
        String password = "testPassword";

        AuthenticateUserRequest request = new AuthenticateUserRequest();
        request.setEmail(email);
        request.setPassword(password);

        User user = new User(username, password, email);
        user.setId(2L);

        String bodyJson = objectMapper.writeValueAsString(request);

        when(userService.findByEmailAndPassword(Mockito.any(), Mockito.any())).thenReturn(user);

        ResultActions resultActions = mockMvc.perform(post("/api/user/authenticate")
                .contentType(MediaType.APPLICATION_JSON)
                .content(bodyJson));

        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("success"))
                .andExpect(jsonPath("$.message").value(UserControllerMessage.USER_AUTHENTICATED.toString()))
                .andExpect(jsonPath("$.payload.userId").value(2));
    }

    @Test
    public void testAuthenticateUserFailure_InvalidCredentials() throws Exception {
        String email = "test@email.com";
        String password = "testPassword";

        AuthenticateUserRequest request = new AuthenticateUserRequest();
        request.setEmail(email);
        request.setPassword(password);

        String bodyJson = objectMapper.writeValueAsString(request);

        when(userService.findByEmailAndPassword(Mockito.any(), Mockito.any())).thenReturn(null);

        ResultActions resultActions = mockMvc.perform(post("/api/user/authenticate")
                .contentType(MediaType.APPLICATION_JSON)
                .content(bodyJson));

        resultActions.andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status").value("error"))
                .andExpect(jsonPath("$.message").value(UserControllerMessage.USER_INVALID_CREDENTIALS.toString()));
    }

    @Test
    public void testGetUserSuccess() throws Exception {
        Long id = Long.valueOf(1);

        when(userService.findById(Mockito.anyLong())).thenReturn(new User());

        ResultActions resultActions = mockMvc.perform(get("/api/user/get/1")
                .contentType(MediaType.APPLICATION_JSON));

        resultActions.andExpect(status().isOk());
    }
    
}