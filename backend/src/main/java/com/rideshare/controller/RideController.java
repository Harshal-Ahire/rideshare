package com.rideshare.controller;

import com.rideshare.dto.RideRequest;
import com.rideshare.dto.RideResponse;
import com.rideshare.service.RideService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rides")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class RideController {

    private final RideService rideService;

    @PostMapping("/book")
    public ResponseEntity<RideResponse> bookRide(@RequestBody RideRequest request,
                                                 @RequestParam String riderEmail) {
        RideResponse response = rideService.createRide(request, riderEmail);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/available")
    public ResponseEntity<List<RideResponse>> getAvailableRides() {
        List<RideResponse> rides = rideService.getAvailableRides();
        return ResponseEntity.ok(rides);
    }

    @PostMapping("/{rideId}/accept")
    public ResponseEntity<RideResponse> acceptRide(@PathVariable String rideId,
                                                   @RequestParam String driverEmail) {
        RideResponse response = rideService.acceptRide(rideId, driverEmail);
        return ResponseEntity.ok(response);
    }
}
