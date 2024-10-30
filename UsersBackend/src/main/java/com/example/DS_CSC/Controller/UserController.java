package com.example.DS_CSC.Controller;

import com.example.DS_CSC.Model.User;
import com.example.DS_CSC.Model.UserDTO;
import com.example.DS_CSC.Repository.UserRepository;
import com.example.DS_CSC.Service.UserServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/User")
@CrossOrigin
public class UserController {

    @Autowired
    private UserServiceImplementation userServiceImplementation;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestTemplate restTemplate;


    @PostMapping("/Register")
    public ResponseEntity<String> register(@RequestBody User user) {
        // Înregistrare utilizator în baza de date a userilor
        userServiceImplementation.register(user);

        // După înregistrare, trimite datele utilizatorului către proiectul DEVICE
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setRole(user.getRole());

        // Trimite request către proiectul DEVICE
        String deviceServiceUrl = "http://localhost:8081/Device/syncUser"; // URL-ul proiectului DEVICE
        try {
            restTemplate.postForEntity(deviceServiceUrl, userDTO, Void.class);
            return ResponseEntity.ok("User registered successfully and synced with Device Service.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("User registered but failed to sync with Device Service.");
        }
    }

    @DeleteMapping("/Delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        userServiceImplementation.delete(id);
        return ResponseEntity.ok("User deleted successfully");
    }


    @GetMapping("/GetAll")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userServiceImplementation.getAllUsers();
        return ResponseEntity.ok(users);
    }


    @PutMapping("/Update")
    public ResponseEntity<String> update(@RequestBody User user) {
        userServiceImplementation.update(user);
        return ResponseEntity.ok("User updated successfully");
    }

//    @GetMapping("/GetById/{id}")
//    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
//        return userRepository.findById(id)
//                .map(user -> {
//                    UserDTO userDTO = new UserDTO();
//                    userDTO.setId(user.getId());
//                    userDTO.setName(user.getName());
//                    userDTO.setRole(user.getRole());
//                    return ResponseEntity.ok(userDTO);
//                })
//                .orElse(ResponseEntity.notFound().build());
//    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> request) {
        String name = request.get("name");
        String password = request.get("password");
        Map<String, Object> response = new HashMap<>();

        // Verificăm dacă utilizatorul este autentificat
        if (userServiceImplementation.authenticateUser(name, password)) {
            response.put("message", "Autentificare reușită!");

            // Obținem rolul utilizatorului
            String role = userServiceImplementation.getRoleByName(name);
            response.put("role", role);

            // Obținem ID-ul utilizatorului
            Long userId = userServiceImplementation.getUserIdByName(name);
            response.put("userId", userId);

            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Autentificare eșuată.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }








}
