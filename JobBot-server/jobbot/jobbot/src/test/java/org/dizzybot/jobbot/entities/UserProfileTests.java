package org.dizzybot.jobbot.entities;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

public class UserProfileTests {

    private User user;

    private UserProfile userProfile;

    private Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    @Before
    public void beforeEach() {
        this.user = new User("Dizzy Bot", "Password", "dizzybot@email.com");
        this.userProfile = this.user.getUserProfile();
    }

    @After
    public void afterEach() {
        this.user = null;
        this.userProfile = null;
    }

    @Test
    public void testUserProfileCreatedByUser() {
        assertNotNull(this.user.getRole());
    }

    @Test
    public void testValidAge() {
        this.userProfile.setAge(18);

        Set<ConstraintViolation<UserProfile>> violations = validator.validate(this.user.getUserProfile());

        assertEquals(0, violations.size());
    }

    @Test
    public void testInvalidAge() {
        this.userProfile.setAge(200);

        Set<ConstraintViolation<UserProfile>> violations = validator.validate(this.user.getUserProfile());

        assertEquals(1, violations.size());

        violations.clear();

        this.userProfile.setAge(10);

        violations = validator.validate(this.user.getUserProfile());

        assertEquals(1, violations.size());
    }

}
