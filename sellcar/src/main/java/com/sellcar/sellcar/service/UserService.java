package com.sellcar.sellcar.service;

import com.sellcar.sellcar.request.LoginRequest;
import com.sellcar.sellcar.request.RegisterRequest;
import com.sellcar.sellcar.response.LoginResponse;

public interface UserService {
    public LoginResponse login(LoginRequest request);
    public void register(RegisterRequest request);
}