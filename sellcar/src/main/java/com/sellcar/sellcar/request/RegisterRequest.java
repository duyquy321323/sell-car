package com.sellcar.sellcar.request;

import javax.validation.constraints.NotBlank;

import lombok.Getter;

@Getter
public class RegisterRequest {
    private String fullName;
    @NotBlank(message = "Email không được để trống")
    private String email;
    @NotBlank(message = "Số điện thoại không được để trống")
    private String phoneNumber;
    private String password;
}