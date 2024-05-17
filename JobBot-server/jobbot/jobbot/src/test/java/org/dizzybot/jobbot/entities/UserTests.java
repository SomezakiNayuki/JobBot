package org.dizzybot.jobbot.entities;

import org.junit.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class UserTests {

    @Test
    public void testCreateUser() {
        User user = new User("Dizzy Bot", "Password", "dizzybot@mail.com");

        assertEquals(user.getUsername(), "Dizzy Bot");
        assertEquals(user.getPassword(), "Password");
        assertEquals(user.getEmail(), "dizzybot@mail.com");
        assertNotNull(user.getRole());
    }

}
