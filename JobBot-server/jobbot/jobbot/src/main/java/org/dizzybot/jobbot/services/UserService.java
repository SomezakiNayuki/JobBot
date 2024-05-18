package org.dizzybot.jobbot.services;

import org.dizzybot.jobbot.entities.User;

public interface UserService {

    public User saveUser(User user);

    public User findByUsernameAndPassword(String username, String password);

    public User findByUsername(String username);

    public User findByEmail(String email);

}
