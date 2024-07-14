package org.dizzybot.jobbot.entities;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

public class JobTest {

    private User user;

    private List<Job> jobAccepted;
    private List<Job> jobPosted;

    private Job jobTest;

    private Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    @Before
    public void beforeEach() {
        this.user = new User("Dizzy Bot", "Password", "dizzybot@email.com");
        this.jobAccepted = this.user.getJobAccepted();
        this.jobPosted = this.user.getJobPosted();
    }

    @After
    public void afterEach() {
        this.jobAccepted = null;
        this.jobPosted = null;
    }

    @Test
    public void testUserJobListsCreateByUser() {
        assertNotNull(this.user.getJobAccepted());
        assertNotNull(this.user.getJobPosted());
    }

    @Test
    public void testUserAccountCreateByUserViolation() {
        assertEquals(0, this.user.getJobAccepted().size()); // []
        assertEquals(0, this.user.getJobPosted().size()); // []
        // todo test adding job
    }

}