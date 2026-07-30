package com.ganesh.inventory_backend.controller;

import com.ganesh.inventory_backend.dto.AuthResponse;
import com.ganesh.inventory_backend.dto.LoginRequest;
import com.ganesh.inventory_backend.dto.RegisterRequest;
import com.ganesh.inventory_backend.entity.User;
import com.ganesh.inventory_backend.repository.UserRepository;
import com.ganesh.inventory_backend.security.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final com.ganesh.inventory_backend.security.CustomUserDetailsService userDetailsService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest().body("Username already taken");
        }

        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole() != null ? request.getRole() : User.Role.EMPLOYEE)
                .build();

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        String token = jwtUtil.generateToken(userDetails);

        User user = userRepository.findByUsername(request.getUsername()).orElseThrow();

        return ResponseEntity.ok(new AuthResponse(token, user.getUsername(), user.getRole().name()));
    }
}