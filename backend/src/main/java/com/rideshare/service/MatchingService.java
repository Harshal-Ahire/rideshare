package com.rideshare.service;

import com.rideshare.model.Driver;
import com.rideshare.model.Ride;
import com.rideshare.repository.DriverRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Simple driver matching service
 */
@Service
@RequiredArgsConstructor
public class MatchingService {

    private final DriverRepository driverRepository;

    public Driver findNearestAvailableDriver(Double pickupLat, Double pickupLng) {
        List<Driver> availableDrivers = driverRepository.findByIsAvailableTrue();
        
        if (availableDrivers.isEmpty()) {
            return null;
        }

        // Simple nearest driver logic (can be improved with geospatial query)
        return availableDrivers.get(0); // For demo, return first available
    }
}