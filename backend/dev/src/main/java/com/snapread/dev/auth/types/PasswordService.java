package com.snapread.dev.auth.types;


import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public record PasswordService(String encodedValue) {

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public PasswordService(String encodedValue) {
        validate(encodedValue);
        this.encodedValue = encoder.encode(encodedValue);
    }

    public static String encode(String rawPassword) {
        validate(rawPassword);
        return encoder.encode(rawPassword);
    }

    public static void validate(String password) {
        if (password == null || password.isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }
        if (password.length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters long");
        }
        if (!password.matches(".*[A-Z].*")) {
            throw new IllegalArgumentException("Password must contain at least one uppercase letter.");
        }
        if (!password.matches(".*[0-9].*")) {
            throw new IllegalArgumentException("Password must contain at least one digit.");
        }
        if (!password.matches(".*[\\W_].*")) {
            throw new IllegalArgumentException("Password must contain at least one special character.");
        }
    }


}
