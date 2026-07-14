package dev.crm.infra.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import dev.crm.domain.error.ApplicationError;
import dev.crm.domain.error.DomainError;
import dev.crm.domain.error.ErrorResponse;

@ControllerAdvice
public class GlobalExpetionHandler {
    @ExceptionHandler(DomainError.class)
    public ResponseEntity<ErrorResponse> handleDomainError(DomainError ex) {
        var errorResponse = new ErrorResponse(ex.getMessage(), ex.getCode());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ApplicationError.class)
    public ResponseEntity<ErrorResponse> handleApplicationError(ApplicationError ex) {
        var errorResponse = new ErrorResponse(ex.getMessage(), ex.getCode());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception ex) {
        var errorResponse = new ErrorResponse("Unexpected error", "INTERNAL_SERVER_ERROR");
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}