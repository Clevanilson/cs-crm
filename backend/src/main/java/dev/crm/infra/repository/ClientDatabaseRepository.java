package dev.crm.infra.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.crm.application.repository.ClientRepository;
import dev.crm.domain.entity.Client;
import dev.crm.infra.model.ClientModel;

@Repository
public interface ClientDatabaseRepository extends JpaRepository<ClientModel, Long>,  ClientRepository{
    Optional<ClientModel> findByEmail(String email); 

    default List<Client> list() {
        return findAll().stream().map(this::MapClientModelToClient).toList();
    }

    default Long save(Client client) {
       var savedClientModel = save(new ClientModel(client.getName(), client.getEmail(), client.getPhone()));
        return savedClientModel.getId();
    }

    default Optional<Client> getByID(Long id) {
        Optional<ClientModel> client = findById(id);
        if (client.isEmpty()) return Optional.empty();
        return Optional.of(MapClientModelToClient(client.get()));
    }

    default Optional<Client> getByEmail(String email) {
        Optional<ClientModel> client =  findByEmail(email);
        if (client.isEmpty()) return Optional.empty();
        return Optional.of(MapClientModelToClient(client.get()));
    }

    private Client MapClientModelToClient(ClientModel client) {
        return new Client(
            client.getName(), 
            client.getEmail(), 
            client.getPhone(), 
            Optional.of(client.getId())
        );
    }



}
