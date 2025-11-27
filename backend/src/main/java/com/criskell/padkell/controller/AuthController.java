package com.criskell.padkell.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.criskell.padkell.dto.SignInRequestDto;
import com.criskell.padkell.dto.SignUpRequestDto;
import com.criskell.padkell.service.AuthService;
import com.criskell.padkell.service.MessageService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    private final MessageService messageService;

    public AuthController(AuthService authService, MessageService messageService) {
        this.authService = authService;
        this.messageService = messageService;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@Valid @RequestBody SignUpRequestDto request) {
        authService.signUp(request);

        var signInDto = new SignInRequestDto(request.getEmail(), request.getPassword());

        return ResponseEntity.status(HttpStatus.CREATED).body(
            Map.of(
                "message",
                messageService.getLocalizedMessage("auth.signUp.success"),
                
                "data",
                authService.signIn(signInDto)
            )
        );
    }

    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(@Valid @RequestBody SignInRequestDto request) {
        return ResponseEntity.ok(authService.signIn(request));
    }
}
