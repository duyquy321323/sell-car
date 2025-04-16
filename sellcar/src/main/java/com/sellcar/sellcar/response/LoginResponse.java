package com.sellcar.sellcar.response;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class LoginResponse {
    private Integer id;
    private String phoneNumber;
    private String email;
    private String fullName;
    private String role;
    private String token;
    private Date expiryTime;
}