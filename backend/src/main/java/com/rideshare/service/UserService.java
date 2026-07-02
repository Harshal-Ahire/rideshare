package com.rideshare.service;

import com.rideshare.model.User;
import com.rideshare.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service for User operations
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User findOrCreateUser(String email, String name) {
        Optional<User> existing = userRepository.findByEmail(email);
        if (existing.isPresent()) {
            return existing.get();
        }

        User newUser = new User();
        newUser.setEmail(email);
        newUser.setName(name != null ? name : "Rider " + System.currentTimeMillis());
        newUser.setRole(User.UserRole.RIDER);
        return userRepository.save(newUser);
    }
}