package com.example.SD_CSC2.Repository;

import com.example.SD_CSC2.Model.UserDTO;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDTORepository extends CrudRepository<UserDTO,Long> {
}
