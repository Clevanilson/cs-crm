package dev.crm.entity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import dev.crm.error.DomainError;

public class ClientTest {
    @Test
    void createClientWithValidData() {
        var sut = new Client("Verso Dessendre", "verso@crm.com", "1198833445566");
        assertEquals(sut.getName(), "Verso Dessendre");
        assertEquals(sut.getEmail(), "verso@crm.com");
        assertEquals(sut.getPhone(), "1198833445566");
    }

    @ParameterizedTest
    @ValueSource(strings = {"a", "a2", ""})
    void createClientWithInvalidName(String name) {
        var sut = assertThrows(DomainError.class, () -> new Client(name, "verso@crm.com", "1198833445566"));
        assertEquals(sut.getMessage(), "Invalid name");
    }

    @ParameterizedTest
    @ValueSource(strings = { 
        "verso.com",
        "com.br",
        "verso"
    })
    void createClientWithInvalidEmail(String email) {
        var sut = assertThrows(DomainError.class, () -> new Client("Verso", email, "1198833445566"));
        assertEquals(sut.getMessage(), "Invalid email");
    }


    @ParameterizedTest
    @ValueSource(strings = {
        "123",
        "",
        "7998833445"
    })
    void createClientWithInvalidPhone(String phone) {
        var sut = assertThrows(DomainError.class, () -> new Client("Verso", "verso@crm.com", phone));
        assertEquals(sut.getMessage(), "Invalid phone");
    }

}
