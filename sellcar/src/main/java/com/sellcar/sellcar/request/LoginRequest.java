package com.sellcar.sellcar.request;

import javax.validation.constraints.NotBlank;

import lombok.Getter;

@Getter
public class LoginRequest {
    @NotBlank(message = "Email không được để trống")
    private String email;
    @NotBlank(message = "Mật khẩu không được để trống")
    private String password;
}