package org.dizzybot.jobbot.entities;

import org.dizzybot.jobbot.enums.VisaEnum;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.jupiter.api.Assertions.*;

public class RoleTests {

    private User user;

    private Role role;

    @Before
    public void beforeEach() {
        this.user = new User("Dizzy Bot", "Password", "dizzybot@email.com");
        this.role = this.user.getRole();
    }

    @After
    public void afterEach() {
        this.user = null;
        this.role = null;
    }

    @Test
    public void testRoleCreatedByUser() {
        assertNotNull(this.user.getRole());
    }

    @Test
    public void testValidToWork() {
        this.role.setCitizen(true);
        this.role.setIdCardNumber("12345");

        assertTrue(this.role.isEligibleToWork());
    }

    @Test
    public void testInvalidToWorkMissingIdCardNumber() {
        assertFalse(this.role.isEligibleToWork());
    }

    @Test
    public void testInvalidToWorkInvalidVisaType() {
        this.role.setVisa(VisaEnum.VISITOR);

        assertFalse(this.role.isEligibleToWork());
    }

}
