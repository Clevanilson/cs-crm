package dev.crm.domain.error;

public class DomainError extends RuntimeException {
    private final String code = "DOMAIN_ERROR";

    public DomainError(String message) {
        super(message);
    }

    public String getCode() {
        return code;
    }
}
