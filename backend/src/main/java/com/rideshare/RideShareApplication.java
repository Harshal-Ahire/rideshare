package com.rideshare;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * Main entry point for RideShare Backend
 * A simplified Uber-like ride booking system
 */
@SpringBootApplication
@EnableScheduling  // For future scheduled tasks (e.g., cleanup)
public class RideShareApplication {

    public static void main(String[] args) {
        SpringApplication.run(RideShareApplication.class, args);
        System.out.println("🚗 RideShare Backend Started Successfully!");
    }
}