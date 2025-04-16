package com.sellcar.sellcar.request;

import javax.validation.constraints.NotBlank;

import lombok.Getter;

@Getter
public class ContactRequest {
    private String name;
    @NotBlank(message = "Email không được để trống")
    private String email;
    @NotBlank(message = "Số điện thoại không được để trống")
    private String phoneNumber;
    private String comment;
}