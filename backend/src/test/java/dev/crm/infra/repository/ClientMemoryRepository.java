package dev.crm.infra.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import dev.crm.application.repository.ClientRepository;
import dev.crm.domain.entity.Client;
import dev.crm.domain.error.DomainError;

public class ClientMemoryRepository implements ClientRepository {
    private List<Client> clients = new ArrayList<>();

    @Override
    public List<Client> list() {
        return this.clients;
    }

    @Override
    public Long save(Client client) {
        if (client.getId().isEmpty()) {
            var id = Optional.of(Long.valueOf(this.clients.size() + 1));
            client.setId(id.get());
            this.clients.add(client);
            return id.get();
        }
        else {
            var currentClient = this.clients.stream().filter(c -> c.getId().equals(client.getId().get())).findFirst().orElseThrow(() -> new DomainError("Client not found"));
            this.clients.set(this.clients.indexOf(currentClient), client);
            return client.getId().get();
        }

    }

    @Override
    public Optional<Client> getByID(Long id) {
        return this.clients.stream().filter(client -> client.getId().get() == id).findFirst();
    }

    public Optional<Client> getByEmail(String email) {
        return this.clients.stream().filter(client -> client.getEmail().equals(email)).findFirst();
    }
}
