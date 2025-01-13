package com.snapread.dev.auth.dto;

import com.snapread.dev.auth.model.User;

public class UserRegistrationDTO {

    private String username;
    private String email;
    private String password;
    private User.Role role;


    public UserRegistrationDTO() {
    }

    public UserRegistrationDTO(String username, String email, String password, User.Role role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;

    }


    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public User.Role getRole() {
        return role;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(User.Role role) {
        this.role = role;
    }



}
