package org.dizzybot.jobbot.services;

import org.dizzybot.jobbot.entities.User;

public interface UserService {

    public User saveUser(User user);

    public User findByEmailAndPassword(String email, String password);

    public User findByEmail(String email);

    public User findById(Long id);

}
