package com.rideshare.dto;

import lombok.Data;

/**
 * Request payload when user books a ride
 */
@Data
public class RideRequest {
    private String pickupLocation;
    private String dropoffLocation;
    private Double pickupLat;
    private Double pickupLng;
    private Double dropoffLat;
    private Double dropoffLng;
    private String rideType; // ECONOMY, PREMIUM, AUTO
}