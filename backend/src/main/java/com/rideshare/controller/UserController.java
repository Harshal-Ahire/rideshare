package com.rideshare.controller;

import com.rideshare.model.User;
import com.rideshare.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * User related endpoints
 */
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestParam String email) {
        User user = userService.findOrCreateUser(email, null);
        return ResponseEntity.ok(user);
    }
}