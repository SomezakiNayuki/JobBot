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

public class AccountTest {

    private User user;

    private Account account;

    private Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    @Before
    public void beforeEach() {
        this.user = new User("Dizzy Bot", "Password", "dizzybot@email.com");
        this.account = this.user.account;
    }

    @After
    public void afterEach() {
        this.user = null;
        this.account = null;
    }

    @Test
    public void testUserAccountCreateByUser() {
        assertNotNull(this.user.account);
    }

    @Test
    public void testUserAccountCreateByUserViolation() {
        this.account.setAccountNumber(123456789001L);
        this.account.setBsb(987654L);

        assertEquals(0.0, this.account.getAccountBalance());
        assertEquals(0, this.account.getPaymentHistory().size()); // []

        Set<ConstraintViolation<Account>> violations = validator.validate(this.account);
        assertEquals(0, violations.size());
    }

}