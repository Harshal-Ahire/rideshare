package com.rideshare.dto;

import com.rideshare.model.Ride;
import lombok.Data;

@Data
public class RideResponse {
    private Long rideId;
    private String status;
    private String message;
    private Double estimatedFare;
    private Ride ride; // Full ride details

    public static RideResponse success(Ride ride) {
        RideResponse response = new RideResponse();
        response.setRideId(ride.getId());
        response.setStatus("SUCCESS");
        response.setRide(ride);
        return response;
    }
}