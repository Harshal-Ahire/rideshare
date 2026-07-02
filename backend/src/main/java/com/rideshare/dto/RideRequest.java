package com.rideshare.dto;

import lombok.Data;

@Data
public class RideRequest {
    private String pickupLocation;
    private String dropLocation;
    private Double pickupLat;
    private Double pickupLng;
    private Double dropLat;
    private Double dropLng;
    private Double fare;
}
