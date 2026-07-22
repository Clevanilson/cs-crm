package dev.crm.application.repository;

import java.util.Optional;

import dev.crm.domain.dto.PageResultDTO;
import dev.crm.domain.dto.PaginationDTO;
import dev.crm.domain.entity.Client;

public interface ClientRepository {
    PageResultDTO<Client> list(PaginationDTO pagination);
    Long save(Client client);
    Optional<Client> getByEmail(String email);
    Optional<Client> getByID(Long id);
}
