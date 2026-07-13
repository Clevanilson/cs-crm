package dev.crm.infra.repository;

import java.util.ArrayList;
import java.util.List;

import dev.crm.application.repository.ClientRepository;
import dev.crm.domain.entity.Client;

public class ClientMemoryRepository implements ClientRepository {
    private List<Client> clients = new ArrayList<>();

    @Override
    public List<Client> list() {
        return this.clients;
    }

    @Override
    public void save(Client client) {
        clients.add(client);
    }
}
