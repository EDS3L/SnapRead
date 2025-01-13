package com.snapread.dev.auth.types;

public record EmailService(String value) {


    public EmailService(String value) {
        validate(value);
        this.value = value;
    }

    public static String validate(String value) {
        regex(value);
        return value;
    }



    private static void regex(String value) {
        if(value == null || value.isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }
        if (!value.matches("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}")) {
            throw new IllegalArgumentException("Invalid email format");
        }
    }
}
