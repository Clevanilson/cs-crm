package dev.crm.application.usecase;

import java.util.List;

import dev.crm.application.repository.ClientRepository;
import dev.crm.domain.entity.Client;

public class ListClients {
    private final ClientRepository repository;

    public ListClients(ClientRepository repository) {
        this.repository = repository;
    }
    
    public List<ListClientsOutput> execute() {
        var clients = this.repository.list();
        return clients.stream().map((Client client) -> new ListClientsOutput(
            client.getName(),
            client.getEmail(), 
            client.getPhone(),
            client.getId().orElse(null)
        )).toList();
    }
}

