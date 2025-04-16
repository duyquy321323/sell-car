package com.sellcar.sellcar.service;

import java.util.Date;

import org.springframework.security.core.userdetails.UserDetails;

import com.sellcar.sellcar.entity.User;

public interface JwtService {
    
    // hàm tạo token từ người dùng
    public String generateToken(User user);

    // hàm lấy email từ token
    public String extractEmail(String token);

    // hàm kiểm tra hạn của token
    public Boolean validateToken(String token, UserDetails userDetails);

    // hàm lấy thời gian của token
    public Date extractExpirationToken(String token);

}