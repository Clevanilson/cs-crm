package dev.crm.infra.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import dev.crm.application.repository.ClientRepository;
import dev.crm.domain.dto.PageResultDTO;
import dev.crm.domain.dto.PaginationDTO;
import dev.crm.domain.entity.Client;
import dev.crm.domain.error.DomainError;

public class ClientMemoryRepository implements ClientRepository {
    private List<Client> clients = new ArrayList<>();

    @Override
    public PageResultDTO<Client> list(PaginationDTO pagination, String name) {
        var filtered = this.clients.stream()
            .filter(client -> matchesName(client, name))
            .toList();
        int fromIndex = Math.min(pagination.page() * pagination.size(), filtered.size());
        int toIndex = Math.min(fromIndex + pagination.size(), filtered.size());
        return new PageResultDTO<>(new ArrayList<>(filtered.subList(fromIndex, toIndex)), filtered.size());
    }

    private static boolean matchesName(Client client, String name) {
        if (name == null || name.isBlank()) {
            return true;
        }
        return client.getName().toLowerCase().contains(name.trim().toLowerCase());
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
