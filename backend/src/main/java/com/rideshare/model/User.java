package com.rideshare.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * User entity - Rider or Driver
 */
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    private String name;
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    private UserRole role; // RIDER or DRIVER

    private Double rating = 5.0;
    private Integer totalRides = 0;

    private LocalDateTime createdAt = LocalDateTime.now();

    public enum UserRole {
        RIDER, DRIVER
    }
}