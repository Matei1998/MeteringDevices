package com.example.DS_CSC.Repository;


import com.example.DS_CSC.Model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User,Long> {

        List<User> findByName(String name);


}
