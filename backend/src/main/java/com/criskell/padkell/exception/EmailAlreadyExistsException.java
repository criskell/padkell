package com.criskell.padkell.exception;

import org.springframework.http.HttpStatus;

public class EmailAlreadyExistsException extends ApiException {
    public static final String EMAIL_ALREADY_EXISTS_ERROR_CODE = "EMAIL_ALREADY_EXISTS";

    public EmailAlreadyExistsException(String email) {
        super(
                HttpStatus.CONFLICT,
                EMAIL_ALREADY_EXISTS_ERROR_CODE,
                "Email already exists",
                String.format("Email already exists: %s", email));
    }
}
