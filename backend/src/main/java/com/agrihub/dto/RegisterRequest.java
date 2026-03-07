package com.agrihub.dto;

public class RegisterRequest {

    private String fullName;
    private String email;
    private String password;

    // GETTERS
    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    // SETTERS
    public void setFullName(String fullName) {   // 🔥 correct name
        this.fullName = fullName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
