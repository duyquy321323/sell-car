package com.sellcar.sellcar.converter;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sellcar.sellcar.dto.UserDTO;
import com.sellcar.sellcar.entity.Admin;
import com.sellcar.sellcar.entity.Dealer;
import com.sellcar.sellcar.entity.Member;
import com.sellcar.sellcar.entity.User;
import com.sellcar.sellcar.exception.UnauthorizedException;
import com.sellcar.sellcar.response.LoginResponse;

@Component
public class UserConverter {
    
    @Autowired
    private ModelMapper modelMapper;

    public UserDTO userToUserDTO(User user){
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        if(user instanceof Member){
            userDTO.setRole("Member");
        } else if (user instanceof Admin){
            userDTO.setRole("Admin");
        } else if (user instanceof Dealer) {
            userDTO.setRole("Dealer");
        } else {
            throw new UnauthorizedException("Tài khoản chưa được phân quyền!!!");
        }
        return userDTO;
    }

    public LoginResponse userToLoginResponse(User user){
        LoginResponse loginResponse = modelMapper.map(user, LoginResponse.class);
        if(user instanceof Member){
            loginResponse.setRole("Member");
        } else if (user instanceof Admin){
            loginResponse.setRole("Admin");
        } else if (user instanceof Dealer) {
            loginResponse.setRole("Dealer");
        } else {
            throw new UnauthorizedException("Tài khoản chưa được phân quyền!!!");
        }
        return loginResponse;
    }
}