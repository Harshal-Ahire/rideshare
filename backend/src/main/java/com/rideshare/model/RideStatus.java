package com.rideshare.model;

/**
 * Enum representing the lifecycle of a ride
 */
public enum RideStatus {
    REQUESTED, // User just requested
    ACCEPTED, // Driver accepted
    DRIVER_EN_ROUTE, // Driver heading to pickup
    ARRIVED, // Driver reached pickup
    IN_PROGRESS, // Ride started
    COMPLETED, // Ride finished
    CANCELLED // Cancelled by user or driver
}
