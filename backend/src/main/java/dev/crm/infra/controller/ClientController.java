package dev.crm.infra.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dev.crm.application.usecase.IdOutput;
import dev.crm.application.usecase.ListClients;
import dev.crm.application.usecase.ListClientsPageOutput;
import dev.crm.application.usecase.SaveClient;
import dev.crm.application.usecase.SaveClientInput;
import dev.crm.domain.dto.PaginationDTO;

@RestController
@RequestMapping("/api/clients")
public class ClientController {
    private final ListClients listClients;
    private final SaveClient saveClient;

    public ClientController(
        ListClients listclients,
        SaveClient saveClient
    ) {
        this.listClients = listclients;
        this.saveClient = saveClient;
    }

    @GetMapping
    public ListClientsPageOutput listClients(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        return this.listClients.execute(new PaginationDTO(page, size));
    }

    @PostMapping
    public ResponseEntity<IdOutput> saveClient(@RequestBody SaveClientInput input) {
        var output = this.saveClient.execute(input);
        return ResponseEntity.status(HttpStatus.CREATED).body(output);
    }
}
