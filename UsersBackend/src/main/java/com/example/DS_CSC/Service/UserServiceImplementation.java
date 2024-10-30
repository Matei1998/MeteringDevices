package com.example.DS_CSC.Service;


import com.example.DS_CSC.Mapper.UserMapper;
import com.example.DS_CSC.Model.User;
import com.example.DS_CSC.Model.UserDTO;
import com.example.DS_CSC.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImplementation {

    @Autowired
    private UserRepository userRepository;

    public void register(User user){
        userRepository.save(user);
    }


    public void delete(Long id){
        userRepository.deleteById(id);
    }

    public void update(User user){
        userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return (List<User>) userRepository.findAll();
    }

   public List<User> findByName(String name){
        return userRepository.findByName(name);
    }

    public boolean authenticateUser(String name, String password) {
        List<User> users = findByName(name);
        if (!users.isEmpty()) {
            User user1 = users.get(0);
            return user1.getPassword().equals(password);
        }
        return false;
    }



    public String getRoleByName(String name) {
        List<User> users = userRepository.findByName(name);
        if (!users.isEmpty()) {
            User user = users.get(0);
            return user.getRole();
        }

        return null;
    }

    public Long getUserIdByName(String name) {
        List<User> users = userRepository.findByName(name); //
        return !users.isEmpty() ? users.get(0).getId() : null; // Returnează ID-ul primului utilizator, dacă există
    }



//    public User getUserById(Long id) {
//        return userRepository.findById(id).orElse(null); // Returnează utilizatorul sau null dacă nu există
//    }

//    public UserDTO getUserDTOById(Long id) {
//        User user = getUserById(id);
//        return UserMapper.toUserDTO(user); // Transformă User în UserDTO
//    }

}
