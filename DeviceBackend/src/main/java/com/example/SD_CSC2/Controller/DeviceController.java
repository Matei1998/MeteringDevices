package com.example.SD_CSC2.Controller;

import com.example.SD_CSC2.Model.Device;
import com.example.SD_CSC2.Model.UserDTO;
import com.example.SD_CSC2.Service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/Device")
@CrossOrigin
public class DeviceController {
    @Autowired
    private DeviceService deviceService;

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Device>> getDevicesByUserId(@PathVariable Long userId) {
        List<Device> devices = deviceService.getDevicesByUserId(userId);
        if (devices.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(devices); // 404 dacă nu există dispozitive
        }
        return ResponseEntity.ok(devices);
    }

    @PostMapping("/addDevice")
    public ResponseEntity<?> addDevice(@RequestBody Device device) {
        // Verificăm dacă userId este furnizat
        if (device.getUserId() == null) {
            return ResponseEntity.badRequest().body("UserId is required"); // Returnează un mesaj de eroare
        }

        try {
            // Adaugă dispozitivul folosind serviciul
            Device newDevice = deviceService.addDevice(device);
            return ResponseEntity.ok(newDevice); // Returnează dispozitivul nou adăugat
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // Returnează mesajul de eroare în caz de excepție
        }
    }




    @DeleteMapping("/Delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        deviceService.deleteDevice(id);
        return ResponseEntity.ok("Device deleted successfully");
    }

    @PutMapping("/Update")
    public ResponseEntity<String> update(@RequestBody Device device) {
        deviceService.updateDevice(device);
        return ResponseEntity.ok("Device updated successfully");
    }

    @GetMapping("/GetAllDevices")
    public ResponseEntity<List<Device>> getAllDevices() {
        List<Device> devices = deviceService.getAllDevices();
        return ResponseEntity.ok(devices);
    }



    @PostMapping("/syncUser")
    public ResponseEntity<Void> syncUser(@RequestBody UserDTO userDTO) {
        deviceService.syncUser(userDTO);
        return ResponseEntity.ok().build();
    }
//    @GetMapping("/{id}")
//    public ResponseEntity<Device> getDeviceById(@PathVariable Long id) {
//        Optional<Device> device = deviceService.getDeviceById(id);
//        return device.map(ResponseEntity::ok)
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteDevice(@PathVariable Long id) {
//        deviceService.deleteDevice(id);
//        return ResponseEntity.noContent().build();
//    }
//    @GetMapping("/userInfo/{userId}")
//    public ResponseEntity<UserDTO> getUserById(@PathVariable Long userId) {
//        ResponseEntity<UserDTO> response = restTemplate.getForEntity("http://localhost:8080/User/GetById/" + userId, UserDTO.class);
//        return response;
//    }
}
