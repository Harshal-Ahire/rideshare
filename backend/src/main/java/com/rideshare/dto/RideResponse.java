package com.rideshare.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class RideResponse {
    private Long id;
    private Long driverId;
    private String pickupLocation;
    private String dropLocation;
    private Double fare;
    private String status;
    private LocalDateTime createdAt;
}
