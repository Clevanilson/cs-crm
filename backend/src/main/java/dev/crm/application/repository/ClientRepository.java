package dev.crm.application.repository;

import java.util.List;
import java.util.Optional;

import dev.crm.domain.entity.Client;

public interface ClientRepository {
    List<Client> list();
    Long save(Client client);
    Optional<Client> getByEmail(String email);
    Optional<Client> getByID(Long id);
}
