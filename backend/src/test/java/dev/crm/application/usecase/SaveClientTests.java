package dev.crm.application.usecase;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import dev.crm.application.repository.ClientRepository;
import dev.crm.domain.error.DomainError;
import dev.crm.infra.repository.ClientMemoryRepository;

public class SaveClientTests {
    private ClientRepository repository;
    private SaveClient sut;

    @BeforeEach
    void setUp() {
        this.repository = new ClientMemoryRepository();
        this.sut = new SaveClient(this.repository);
    }

    @Test
    void executeWithSuccess() {
        var output = this.sut.execute(new SaveClientInput("John Doe", "john.doe@example.com", "11988334455"));
        var savedClient = this.repository.getByEmail("john.doe@example.com");
        assertEquals(savedClient.get().getId().get(), output.id());
        assertEquals(savedClient.isPresent(), true);
        assertEquals(savedClient.get().getName(), "John Doe");
        assertEquals(savedClient.get().getEmail(), "john.doe@example.com");
        assertEquals(savedClient.get().getPhone(), "11988334455");
    }

    @Test
    void executeWithEmailAlreadyExists() {
        this.sut.execute(new SaveClientInput("John Doe", "john.doe@example.com", "11988334455"));
        var exception = assertThrows(DomainError.class, () -> this.sut.execute(new SaveClientInput("John Doe", "john.doe@example.com", "11988334455")));
        assertEquals(exception.getMessage(), "Client already exists");
    }
    

    @Test 
    void executeWithInvalidData() {
        var exception = assertThrows(DomainError.class, () -> this.sut.execute(new SaveClientInput("", "john.doe@example.com", "11988334455")));
        assertEquals(exception.getMessage(), "Invalid name");
    }
}
