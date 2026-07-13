package dev.crm.application.usecase;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import dev.crm.application.repository.ClientRepository;
import dev.crm.domain.entity.Client;
import dev.crm.infra.repository.ClientMemoryRepository;

public class ListClientsTests {
    private ClientRepository repository;
    private ListClients sut;

    @BeforeEach
    void setup() {
        this.repository = new ClientMemoryRepository();
        this.sut = new ListClients(repository);
    }

    @Test
    void executWithSuccess() {
        var client = new Client("Alicia Dessendre", "alicia@crm.com", "11988334455");
        this.repository.save(client);
        List<ListClientsOutput> clients = sut.execute();
        assertEquals(clients.size(), 1);
        assertEquals(client.getName(), clients.get(0).name());
        assertEquals(client.getEmail(), clients.get(0).email());
        assertEquals(client.getPhone(), clients.get(0).phone());
    }
}
