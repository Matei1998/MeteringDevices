
package com.example.SD_CSC2.Service;

import com.example.SD_CSC2.Model.Device;
import com.example.SD_CSC2.Model.UserDTO;
import com.example.SD_CSC2.Repository.DeviceRepository;
import com.example.SD_CSC2.Repository.UserDTORepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private UserDTORepository userDTORepository;

    public void syncUser(UserDTO userDTO) {
        userDTORepository.save(userDTO);
    }


    public List<Device> getDevicesByUserId(Long userId) {
        // Verifică dacă utilizatorul există
        if (userId == null) {
            throw new IllegalArgumentException("User ID must not be null");
        }
        // Găsește toate dispozitivele asociate utilizatorului
        return deviceRepository.findByUserId(userId);
    }


    public Device addDevice(Device device) {
        Optional<UserDTO> userOptional = userDTORepository.findById(device.getUserId());
        if (!userOptional.isPresent()) {
            throw new RuntimeException("User not found");
        }
        return deviceRepository.save(device);
    }



    public Device updateDevice(Device device){
        return deviceRepository.save(device);
    }

    public List<Device> getAllDevices() {
        return (List<Device>) deviceRepository.findAll();
    }



    public void deleteDevice(Long id) {
        deviceRepository.deleteById(id);
    }

//    public Optional<Device> getDeviceById(Long id) {
//        return deviceRepository.findById(id);
//    }
//    public UserDTO getUserDetails(Long userId) {
//        ResponseEntity<UserDTO> response = restTemplate.getForEntity("http://localhost:8080/User/GetById/" + userId, UserDTO.class);
//        return response.getBody();
//    }


}
