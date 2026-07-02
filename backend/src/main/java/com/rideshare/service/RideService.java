package com.rideshare.service;

import com.rideshare.dto.RideRequest;
import com.rideshare.model.Ride;
import com.rideshare.model.User;
import com.rideshare.repository.RideRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/**
 * Main service for ride operations
 */
@Service
@RequiredArgsConstructor
public class RideService {

    private final RideRepository rideRepository;
    private final MatchingService matchingService;
    private final UserService userService;

    public Ride createRide(RideRequest request, String riderEmail) {
        User rider = userService.findOrCreateUser(riderEmail, null);

        Ride ride = new Ride();
        ride.setRider(rider);
        ride.setPickupLocation(request.getPickupLocation());
        ride.setDropoffLocation(request.getDropoffLocation());
        ride.setPickupLat(request.getPickupLat());
        ride.setPickupLng(request.getPickupLng());
        ride.setDropoffLat(request.getDropoffLat());
        ride.setDropoffLng(request.getDropoffLng());
        ride.setStatus(Ride.RideStatus.REQUESTED);
        ride.setRequestedAt(LocalDateTime.now());

        // Calculate simple fare
        double distance = calculateDistance(request.getPickupLat(), request.getPickupLng(),
                                           request.getDropoffLat(), request.getDropoffLng());
        ride.setFare(estimateFare(distance));

        // Match driver
        Driver matchedDriver = matchingService.findNearestAvailableDriver(
            request.getPickupLat(), request.getPickupLng());

        if (matchedDriver != null) {
            ride.setDriver(matchedDriver);
            ride.setStatus(Ride.RideStatus.ACCEPTED);
        }

        return rideRepository.save(ride);
    }

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        // Simple Haversine approximation for demo
        return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2)) * 111;
    }

    private double estimateFare(double distanceKm) {
        return 50 + (distanceKm * 12); // Base + per km rate (in INR)
    }
}