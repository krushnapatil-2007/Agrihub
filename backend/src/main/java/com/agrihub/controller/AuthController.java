package com.agrihub.controller;

import com.agrihub.model.User;
import com.agrihub.service.AuthService;
import com.agrihub.dto.LoginRequest;
import com.agrihub.dto.RegisterRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.agrihub.dto.RegisterRequest;
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    // REGISTER (unchanged)
    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return authService.login(request.getEmail(), request.getPassword());
    }
}
