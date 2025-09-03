package com.criskell.padkell.exception;

import org.springframework.http.HttpStatus;

import com.criskell.padkell.config.ErrorCode;

public class EmailAlreadyExistsException extends ApiException {
    public EmailAlreadyExistsException(String email) {
        super(
                HttpStatus.CONFLICT,
                ErrorCode.EMAIL_ALREADY_EXISTS.getCode(),
                "Email already exists",
                String.format("Email already exists: %s", email));
    }
}
