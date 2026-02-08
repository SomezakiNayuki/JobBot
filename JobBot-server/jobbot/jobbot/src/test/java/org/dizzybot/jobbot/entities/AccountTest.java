package org.dizzybot.jobbot.entities;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class AccountTest {

    private User user;

    private Account account;

    private Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    @Before
    public void beforeEach() {
        this.user = new User("Dizzy Bot", "Password", "dizzybot@email.com");
        this.account = this.user.getAccount();
    }

    @After
    public void afterEach() {
        this.user = null;
        this.account = null;
    }

    @Test
    public void testUserAccountCreateByUser() {
        assertNotNull(this.user.getAccount());
    }

}