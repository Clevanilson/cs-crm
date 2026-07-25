package dev.crm.application.usecase;

import dev.crm.application.repository.ClientRepository;
import dev.crm.domain.dto.PaginationDTO;
import dev.crm.domain.dto.PaginationOutput;
import dev.crm.domain.entity.Client;

public class ListClients {
    private final ClientRepository repository;

    public ListClients(ClientRepository repository) {
        this.repository = repository;
    }
    
    public ListClientsPageOutput execute(PaginationDTO input) {
        var result = this.repository.list(input);
        var data = result.items().stream().map((Client client) -> new ListClientsOutput(
            client.getName(),
            client.getEmail(), 
            client.getPhone(),
            client.getId().orElse(null)
        )).toList();
        var pagination = new PaginationOutput(result.total(), input.page(), input.size());
        return new ListClientsPageOutput(data, pagination);
    }
}
