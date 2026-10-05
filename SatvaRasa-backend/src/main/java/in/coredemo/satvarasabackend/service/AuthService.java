package in.coredemo.satvarasabackend.service;

import in.coredemo.satvarasabackend.dto.AuthResponse;
import in.coredemo.satvarasabackend.dto.LoginRequest;
import in.coredemo.satvarasabackend.dto.RegisterRequest;
import in.coredemo.satvarasabackend.entity.User;
import in.coredemo.satvarasabackend.repository.UserRepository;
import in.coredemo.satvarasabackend.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {

        if (request.getEmail() == null ||
                request.getEmail().isBlank()) {

            throw new RuntimeException("Email is required.");
        }

        if (request.getPassword() == null ||
                request.getPassword().isBlank()) {

            throw new RuntimeException("Password is required.");
        }

        if (!request.getPassword()
                .equals(request.getConfirmPassword())) {

            throw new RuntimeException(
                    "Passwords do not match."
            );
        }

        String email = request.getEmail()
                .trim()
                .toLowerCase();

        if (userRepository.existsByEmail(email)) {

            throw new RuntimeException(
                    "An account with this email already exists."
            );
        }

        User user = new User();

        user.setEmail(email);

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        userRepository.save(user);

        String token = jwtService.generateToken(
                user.getEmail()
        );

        return new AuthResponse(
                "Registration successful.",
                user.getEmail(),
                token
        );
    }

    public AuthResponse login(LoginRequest request) {

        if (request.getEmail() == null ||
                request.getEmail().isBlank()) {

            throw new RuntimeException("Email is required.");
        }

        if (request.getPassword() == null ||
                request.getPassword().isBlank()) {

            throw new RuntimeException("Password is required.");
        }

        String email = request.getEmail()
                .trim()
                .toLowerCase();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Invalid email or password."
                        )
                );

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {

            throw new RuntimeException(
                    "Invalid email or password."
            );
        }

        String token = jwtService.generateToken(
                user.getEmail()
        );

        return new AuthResponse(
                "Login successful.",
                user.getEmail(),
                token
        );
    }
}