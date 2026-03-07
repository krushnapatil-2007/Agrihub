package com.agrihub.service;

import com.agrihub.dto.RegisterRequest;
import com.agrihub.model.User;

public interface AuthService {

   // String register(User user);
	String register(RegisterRequest request);

    String login(String email, String password);
}
