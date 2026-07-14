package dev.crm.application.usecase;

import java.util.Optional;

import dev.crm.application.repository.ClientRepository;
import dev.crm.domain.entity.Client;
import dev.crm.domain.error.DomainError;

public class SaveClient {
    private final ClientRepository clientRepository;

    public SaveClient(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public IdOutput execute(SaveClientInput input) {
        Optional<Client> client = clientRepository.getByEmail(input.email());
        if (client.isPresent()) {
            throw new DomainError("Client already exists");
        }
        var id = clientRepository.save(Client.create(input.name(), input.email(), input.phone()));
        return new IdOutput(id);
    }
}
