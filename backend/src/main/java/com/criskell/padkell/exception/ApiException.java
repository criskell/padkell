package com.criskell.padkell.exception;

import static java.net.URI.create;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.ErrorResponseException;

public abstract class ApiException extends ErrorResponseException {
    protected ApiException(HttpStatus status, String code, String title) {
        this(status, code, title, null);
    }

    protected ApiException(HttpStatus status, String code, String title, String detail) {
        super(status, createProblemDetail(status, code, title, detail), null);
    }

    private static ProblemDetail createProblemDetail(HttpStatus status, String code, String title, String detail) {
        var problemDetail = ProblemDetail.forStatus(status);

        problemDetail.setTitle(title);

        if (detail != null && !detail.isBlank()) {
            problemDetail.setDetail(detail);
        }

        problemDetail.setType(create("https://pad.criskell.com/problems/" + code.toLowerCase().replace("_", "-")));

        return problemDetail;
    }
}
