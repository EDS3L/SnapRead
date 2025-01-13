package com.snapread.dev.auth.service;


import com.snapread.dev.auth.model.User;
import com.snapread.dev.auth.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder encoder;



    public AuthenticationService(UserRepository userRepository, BCryptPasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    public boolean isAuthenticated(String email, String rawPassword){
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return encoder.matches(rawPassword, user.getPassword());
        }
        return false;
    }

}
