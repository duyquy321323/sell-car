package com.sellcar.sellcar.request;

import javax.validation.constraints.NotBlank;

import lombok.Getter;

@Getter
public class RegisterRequest {
    private String fullName;
    @NotBlank(message = "Email không được để trống")
    private String email;
    private String phoneNumber;
    @NotBlank(message = "Mật khẩu không được để trống")
    private String password;
}