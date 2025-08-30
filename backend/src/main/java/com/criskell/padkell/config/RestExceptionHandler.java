package com.criskell.padkell.config;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        var fieldErrors = e.getFieldErrors()
                .stream()
                .map(fieldError -> new InvalidParam(fieldError.getField(), fieldError.getDefaultMessage()))
                .toList();
        var problemDetail = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);

        problemDetail.setTitle("Your request parameters didn't validate.");
        problemDetail.setProperty("invalid-params", fieldErrors);

        return problemDetail;
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, String>> handleMissingBody(HttpMessageNotReadableException ex) {
        Map<String, String> error = Map.of(
                "error", "Bad request",
                "message", "Request body is required"
        );

        return ResponseEntity.badRequest().body(error);
    }

    private record InvalidParam(String name, String reason) {

    }
}
