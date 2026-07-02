package com.rideshare.service;

import com.rideshare.model.Driver;
import com.rideshare.model.User;
import com.rideshare.repository.DriverRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service for Driver related operations
 */
@Service
@RequiredArgsConstructor
public class DriverService {

    private final DriverRepository driverRepository;

    /**
     * For demo purposes - create some mock drivers
     */
    public void initializeMockDrivers() {
        if (driverRepository.count() == 0) {
            // Mock Driver 1
            Driver driver1 = new Driver();
            driver1.setVehicleModel("Toyota Camry");
            driver1.setVehicleNumber("MH-04-AB-1234");
            driver1.setVehicleType("PREMIUM");
            driver1.setAvailable(true);
            driver1.setCurrentLatitude(19.0596);
            driver1.setCurrentLongitude(72.8295);
            driverRepository.save(driver1);

            // Mock Driver 2
            Driver driver2 = new Driver();
            driver2.setVehicleModel("Honda City");
            driver2.setVehicleNumber("MH-04-CD-5678");
            driver2.setVehicleType("ECONOMY");
            driver2.setAvailable(true);
            driver2.setCurrentLatitude(19.0720);
            driver2.setCurrentLongitude(72.8450);
            driverRepository.save(driver2);

            System.out.println(" Mock drivers initialized successfully!");
        }
    }

    public List<Driver> getAvailableDrivers() {
        return driverRepository.findByIsAvailableTrue();
    }

    public void updateDriverLocation(Long driverId, Double lat, Double lng) {
        Driver driver = driverRepository.findById(driverId).orElse(null);
        if (driver != null) {
            driver.setCurrentLatitude(lat);
            driver.setCurrentLongitude(lng);
            driverRepository.save(driver);
        }
    }
}