package com.ganesh.inventory_backend.dto;

import com.ganesh.inventory_backend.entity.User;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Password is required")
    private String password;

    private User.Role role; // ADMIN, MANAGER, or EMPLOYEE
}