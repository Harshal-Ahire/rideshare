package com.rideshare.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "rides")
@Data
public class Ride {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "rider_id")
    private User rider;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private Driver driver;

    private String pickupLocation;
    private String dropoffLocation;

    private Double pickupLat;
    private Double pickupLng;
    private Double dropoffLat;
    private Double dropoffLng;

    @Enumerated(EnumType.STRING)
    private RideStatus status = RideStatus.REQUESTED;

    private Double fare;
    private LocalDateTime requestedAt = LocalDateTime.now();
    private LocalDateTime completedAt;
}
