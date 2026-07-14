package dev.crm.domain.error;

public class ApplicationError extends RuntimeException {
    private final String code = "APPLICATION_ERROR";

    public ApplicationError(String message) {
        super(message);
    }

    public String getCode() {
        return code;
    }
}