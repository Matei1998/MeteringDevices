package com.example.SD_CSC2.Repository;

import com.example.SD_CSC2.Model.Device;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeviceRepository extends CrudRepository<Device, Long> {

    List<Device> findByUserId(Long userId);
}
