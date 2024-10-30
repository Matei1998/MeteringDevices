package com.example.DS_CSC.Mapper;

import com.example.DS_CSC.Model.User;
import com.example.DS_CSC.Model.UserDTO;

public class UserMapper {

    public static UserDTO toUserDTO(User user) {
        if (user == null) {
            return null;
        }
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setRole(user.getRole());
        return userDTO;
    }

    public static User toUser(UserDTO userDTO) {
        if (userDTO == null) {
            return null;
        }
        User user = new User();
        user.setId(userDTO.getId());
        user.setName(userDTO.getName());
        user.setRole(userDTO.getRole());
        // Asigură-te că adaugi un câmp pentru parolă, dacă este necesar
        return user;
    }
}
