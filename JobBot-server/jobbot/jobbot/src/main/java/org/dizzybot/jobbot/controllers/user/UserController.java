package org.dizzybot.jobbot.controllers.user;

import org.dizzybot.jobbot.controllers.user.requests.AuthenticateUserRequest;
import org.dizzybot.jobbot.controllers.user.responses.SuccessAuthenticatedResponse;
import org.dizzybot.jobbot.entities.Role;
import org.dizzybot.jobbot.entities.User;
import org.dizzybot.jobbot.controllers.user.requests.CreateUserRequest;
import org.dizzybot.jobbot.controllers.general.responses.GeneralResponse;
import org.dizzybot.jobbot.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:4200") // Dev config, to be deleted in PROD
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity create(@RequestBody CreateUserRequest request) {
        User user = new User(request.getUsername(), request.getPassword(), request.getEmail());
        user.setRole(new Role(request.isWorkEligibility(), request.getVisaType(), request.getIdCardNumber()));

        if (userService.findByEmail(request.getEmail()) != null) {
            return new ResponseEntity<>(new GeneralResponse("error", "Email already registered"), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        try {
            user = userService.saveUser(user);
        } catch (Exception e) {
            return new ResponseEntity<>(new GeneralResponse("error", "Error creating user"), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(new GeneralResponse("success", "User created", new SuccessAuthenticatedResponse(user.getId())), HttpStatus.CREATED);
    }

    @PostMapping("/authenticate")
    public ResponseEntity authenticate(@RequestBody AuthenticateUserRequest request) {
        String email = request.getEmail();
        String password = request.getPassword();

        User user = userService.findByEmailAndPassword(email, password);

        if (user != null) {
            return new ResponseEntity<>(new GeneralResponse("success", "User authenticated", new SuccessAuthenticatedResponse(user.getId())), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new GeneralResponse("error", "Invalid account or password"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get/{userId}")
    public ResponseEntity get(@PathVariable Long userId) {
        User user = userService.findById(userId);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new GeneralResponse("error", "User not found"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
