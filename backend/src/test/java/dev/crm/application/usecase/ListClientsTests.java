package dev.crm.application.usecase;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import dev.crm.application.repository.ClientRepository;
import dev.crm.domain.dto.PaginationDTO;
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
    void executeWithSuccess() {
        String[] names = {"Alicia", "Lune", "Verso", "Renoir", "Monoco"};
        for (int i = 0; i < names.length; i++) {
            this.repository.save(Client.create(names[i], "client" + (i + 1) + "@crm.com", "1198833445" + i));
        }
        ListClientsPageOutput page = sut.execute(new PaginationDTO(1, 2));
        assertEquals(2, page.data().size());
        assertEquals(5, page.pagination().total());
        assertEquals(1, page.pagination().page());
        assertEquals(2, page.pagination().size());
        assertEquals("Verso", page.data().get(0).name());
        assertEquals("Renoir", page.data().get(1).name());
    }
}
