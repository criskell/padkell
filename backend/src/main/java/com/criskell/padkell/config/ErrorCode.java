package com.criskell.padkell.config;

import java.net.URI;

public enum ErrorCode {
    EMAIL_ALREADY_EXISTS("email-already-exists"),
    INVALID_CREDENTIALS("invalid-credentials");

    private final String code;

    ErrorCode(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public URI getType() {
        return ProblemDetailType.forCode(code);
    }
}
