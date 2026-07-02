package com.rideshare.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "drivers")
@Data
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String vehicleModel;
    private String vehicleNumber;
    private String vehicleType; // ECONOMY, PREMIUM, AUTO

    private boolean isAvailable = true;

    private Double currentLatitude;
    private Double currentLongitude;
}