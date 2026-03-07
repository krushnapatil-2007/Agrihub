package com.agrihub.service.impl;

import com.agrihub.dto.RegisterRequest;
import com.agrihub.model.User;
import com.agrihub.repository.UserRepository;
import com.agrihub.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

//    @Override
//    public String register(User user) {
//        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
//            return "Email already registered!";
//        }
//
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        userRepository.save(user);
//        return "Registration successful!";
//    }
     @Override


public String register(RegisterRequest request) {

    if (userRepository.findByEmail(request.getEmail()).isPresent()) {
        return "Email already registered!";
    }

    User user = new User();
    user.setFullName(request.getFullName());
    user.setEmail(request.getEmail());
    user.setPassword(passwordEncoder.encode(request.getPassword())); // IMPORTANT

    userRepository.save(user);

    return "Registration successful!";
}
    @Override
    public String login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (passwordEncoder.matches(password, user.getPassword())) {
            return "Login successful!";
        } else {
            return "Invalid credentials!";
        }
    }
}
