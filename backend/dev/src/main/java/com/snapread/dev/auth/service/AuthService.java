package com.snapread.dev.auth.service;

import com.snapread.dev.auth.dto.UserLoginDTO;
import com.snapread.dev.auth.dto.UserRegistrationDTO;
import com.snapread.dev.auth.model.User;
import com.snapread.dev.auth.repository.UserRepository;
import com.snapread.dev.auth.security.jwt.service.JwtService;

import com.snapread.dev.auth.types.EmailService;
import com.snapread.dev.auth.types.PasswordService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;


    public AuthService(UserRepository userRepository, JwtService jwtService, AuthenticationService authenticationService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;

    }

    public ResponseEntity<?> registerUser(UserRegistrationDTO userRegistrationDTO) {
        String encodedPassword = PasswordService.encode(userRegistrationDTO.getPassword());
        String email = EmailService.validate(userRegistrationDTO.getEmail());

        if(userRegistrationDTO.getUsername() != null && userRegistrationDTO.getUsername().length() > 3) {
            User user = new User(
                    userRegistrationDTO.getUsername(),
                    email,
                    encodedPassword,
                    User.Role.USER);

            userRepository.save(user);

            return ResponseEntity.ok( new UserRegistrationDTO(userRegistrationDTO.getUsername(), email, encodedPassword, userRegistrationDTO.getRole()));
        } else {
            return ResponseEntity.badRequest().body("Invalid username format");
        }

    }


    public UserLoginDTO userLogin(String username, String password) {
        boolean isAuthenticated = authenticationService.isAuthenticated(username,password);

        if(isAuthenticated) {
            User user = userRepository.findByEmail(username).orElseThrow(() -> new RuntimeException("User not found"));

            String token = jwtService.generateToken(
                    user.getUsername(),
                    user.getRole().toString(),
                    user.getEmail()
            );

            return new UserLoginDTO(user.getUsername(), user.getEmail(), token);
        } else {
            throw new RuntimeException("Invalid username or password");
        }
    }


}
