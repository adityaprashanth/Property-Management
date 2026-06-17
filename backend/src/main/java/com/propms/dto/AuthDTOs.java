package com.propms.dto;

import lombok.Data;

@Data
class SignupRequest {
    private String email, password, firstname, lastname, phoneNo, address;
}

@Data
class LoginRequest {
    private String email, password;
}

@Data
class AuthResponse {
    private String token, role, firstname;
    private Integer customerId;

    public AuthResponse(String token, String role, Integer customerId, String firstname) {
        this.token = token; this.role = role;
        this.customerId = customerId; this.firstname = firstname;
    }
}