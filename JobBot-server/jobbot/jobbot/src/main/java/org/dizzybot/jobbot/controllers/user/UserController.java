package org.dizzybot.jobbot.controllers.user;

import org.dizzybot.jobbot.controllers.general.responses.ResponseStatusEnum;
import org.dizzybot.jobbot.controllers.user.messages.UserControllerMessage;
import org.dizzybot.jobbot.controllers.user.requests.AuthenticateUserRequest;
import org.dizzybot.jobbot.controllers.user.responses.SuccessAuthenticatedResponse;
import org.dizzybot.jobbot.entities.Role;
import org.dizzybot.jobbot.entities.User;
import org.dizzybot.jobbot.controllers.user.requests.CreateUserRequest;
import org.dizzybot.jobbot.controllers.general.responses.GeneralResponse;
import org.dizzybot.jobbot.enums.VisaEnum;
import org.dizzybot.jobbot.services.UserService;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.Parameter;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:4200") // Dev config, to be deleted in PROD
@Tag(name = "User", description = "User management endpoints")
public class UserController {

    Logger LOG = org.slf4j.LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Operation(summary = "Create user", description = "Creates a new user account")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "User created", content = @Content(schema = @Schema(implementation = GeneralResponse.class))),
        @ApiResponse(responseCode = "500", description = "Email already registered", content = @Content(schema = @Schema(implementation = GeneralResponse.class)))
    })
    @PostMapping("/create")
    public ResponseEntity<GeneralResponse> create(
        @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Create user payload", required = true, content = @Content(schema = @Schema(implementation = CreateUserRequest.class)))
        @RequestBody CreateUserRequest request) {
        if (userService.findByEmail(request.getEmail()) != null) {
            LOG.error("Email {} is already registered", request.getEmail());
            return new ResponseEntity<>(new GeneralResponse(ResponseStatusEnum.ERROR, UserControllerMessage.EMAIL_OCCUPIED.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        User user = new User(request.getUsername(), request.getPassword(), request.getEmail());
        Role role = new Role(request.isWorkEligible(), VisaEnum.fromString(request.getVisaType()), request.getIdCardNumber());
        user.setRole(role);

        user = userService.saveUser(user);

        return new ResponseEntity<>(new GeneralResponse(ResponseStatusEnum.SUCCESS, UserControllerMessage.USER_CREATED.getMessage(), new SuccessAuthenticatedResponse(user.getId())), HttpStatus.CREATED);
    }

    @Operation(summary = "Authenticate user", description = "Authenticate user with email and password")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User authenticated", content = @Content(schema = @Schema(implementation = GeneralResponse.class))),
        @ApiResponse(responseCode = "401", description = "Invalid account or password", content = @Content(schema = @Schema(implementation = GeneralResponse.class)))
    })
    @PostMapping("/authenticate")
    public ResponseEntity<GeneralResponse> authenticate(
        @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Authenticate payload", required = true, content = @Content(schema = @Schema(implementation = AuthenticateUserRequest.class)))
        @RequestBody AuthenticateUserRequest request) {
        String email = request.getEmail();
        String password = request.getPassword();

        User user = userService.findByEmailAndPassword(email, password);

        if (user != null) {
            return new ResponseEntity<>(new GeneralResponse(ResponseStatusEnum.SUCCESS, UserControllerMessage.USER_AUTHENTICATED.getMessage(), new SuccessAuthenticatedResponse(user.getId())), HttpStatus.OK);
        } else {
            LOG.error("Failed authentication attempt for email {}", email);
            return new ResponseEntity<>(new GeneralResponse(ResponseStatusEnum.ERROR, UserControllerMessage.USER_INVALID_CREDENTIALS.getMessage()), HttpStatus.UNAUTHORIZED);
        }
    }

    @Operation(summary = "Get user", description = "Retrieve user by id")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User found", content = @Content(schema = @Schema(implementation = User.class))),
        @ApiResponse(responseCode = "404", description = "User not found", content = @Content(schema = @Schema(implementation = GeneralResponse.class)))
    })
    @GetMapping("/get/{userId}")
    public ResponseEntity<Object> get(
        @Parameter(description = "ID of the user to retrieve", required = true) @PathVariable Long userId) {
        User user = userService.findById(userId);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            LOG.warn("User with id {} not found", userId);
            return new ResponseEntity<>(new GeneralResponse(ResponseStatusEnum.ERROR, UserControllerMessage.USER_NOT_FOUND.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

}