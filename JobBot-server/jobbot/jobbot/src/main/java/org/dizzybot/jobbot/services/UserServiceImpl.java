package org.dizzybot.jobbot.services;

import org.dizzybot.jobbot.entities.User;
import org.dizzybot.jobbot.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(propagation = Propagation.SUPPORTS)
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    // No need to include repository transitive methods into unit tests

    @Transactional(propagation = Propagation.REQUIRED)
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User findByEmailAndPassword(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

}
