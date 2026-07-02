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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "driver_id")
    private User driver;   // Changed from Driver to User

    private String pickupLocation;
    private String dropLocation;

    private Double pickupLat;
    private Double pickupLng;
    private Double dropLat;
    private Double dropLng;

    private Double fare;

    @Enumerated(EnumType.STRING)
    private RideStatus status = RideStatus.PENDING;

    private LocalDateTime createdAt;
}
