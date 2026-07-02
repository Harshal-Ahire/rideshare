package com.rideshare.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

/**
 * WebSocket controller for real-time updates
 */
@Controller
public class WebSocketController {

    /**
     * Broadcast driver location updates
     */
    @MessageMapping("/driver/location")
    @SendTo("/topic/driver/location")
    public String updateDriverLocation(String locationUpdate) {
        return locationUpdate; // In real app, send structured object
    }
}