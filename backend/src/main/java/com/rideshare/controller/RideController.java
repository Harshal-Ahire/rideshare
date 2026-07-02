package com.rideshare.controller;

import com.rideshare.dto.RideRequest;
import com.rideshare.dto.RideResponse;
import com.rideshare.model.Ride;
import com.rideshare.service.RideService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Main Ride booking endpoints
 */
@RestController
@RequestMapping("/api/rides")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class RideController {

    private final RideService rideService;

    @PostMapping("/book")
    public ResponseEntity<RideResponse> bookRide(@RequestBody RideRequest request,
                                                 @RequestParam String riderEmail) {
        Ride ride = rideService.createRide(request, riderEmail);
        return ResponseEntity.ok(RideResponse.success(ride));
    }

    @GetMapping("/{rideId}")
    public ResponseEntity<Ride> getRide(@PathVariable Long rideId) {
        // For simplicity, return mock or implement repository find
        return ResponseEntity.ok(new Ride()); // Expand as needed
    }
}