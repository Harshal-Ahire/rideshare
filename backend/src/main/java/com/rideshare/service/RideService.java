package com.rideshare.service;

import com.rideshare.dto.RideRequest;
import com.rideshare.dto.RideResponse;
import com.rideshare.model.Ride;
import com.rideshare.model.User;
import com.rideshare.repository.RideRepository;
import com.rideshare.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RideService {

    @Autowired
    private RideRepository rideRepository;

    @Autowired
    private UserRepository userRepository;

    public RideResponse createRide(RideRequest request, String driverId) {
        User driver = userRepository.findById(Long.parseLong(driverId))
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        Ride ride = new Ride();
        ride.setDriver(driver);
        ride.setPickupLocation(request.getPickupLocation());
        ride.setDropLocation(request.getDropLocation());
        ride.setPickupLat(request.getPickupLat());
        ride.setPickupLng(request.getPickupLng());
        ride.setDropLat(request.getDropLat());
        ride.setDropLng(request.getDropLng());
        ride.setFare(request.getFare());
        ride.setStatus("PENDING");
        ride.setCreatedAt(LocalDateTime.now());

        Ride savedRide = rideRepository.save(ride);
        return mapToResponse(savedRide);
    }

    public List<RideResponse> getAvailableRides() {
        List<Ride> rides = rideRepository.findByStatus("PENDING");
        return rides.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public RideResponse acceptRide(String rideId, String driverId) {
        Ride ride = rideRepository.findById(Long.parseLong(rideId))
                .orElseThrow(() -> new RuntimeException("Ride not found"));

        if (!ride.getDriver().getId().equals(Long.parseLong(driverId))) {
            throw new RuntimeException("Not authorized");
        }

        ride.setStatus("ACCEPTED");
        Ride saved = rideRepository.save(ride);
        return mapToResponse(saved);
    }

    private RideResponse mapToResponse(Ride ride) {
        RideResponse response = new RideResponse();
        response.setId(ride.getId());
        response.setDriverId(ride.getDriver().getId());
        response.setPickupLocation(ride.getPickupLocation());
        response.setDropLocation(ride.getDropLocation());
        response.setFare(ride.getFare());
        response.setStatus(ride.getStatus().name());
        response.setCreatedAt(ride.getCreatedAt());
        return response;
    }
}
