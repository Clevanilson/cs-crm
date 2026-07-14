package dev.crm.infra.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.crm.application.usecase.IdOutput;
import dev.crm.application.usecase.ListClients;
import dev.crm.application.usecase.ListClientsOutput;
import dev.crm.application.usecase.SaveClient;
import dev.crm.application.usecase.SaveClientInput;

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
    public List<ListClientsOutput> listClients() {
        return this.listClients.execute();
    }

    @PostMapping
    public ResponseEntity<IdOutput> saveClient(@RequestBody SaveClientInput input) {
        var output = this.saveClient.execute(input);
        return ResponseEntity.status(HttpStatus.CREATED).body(output);
    }
}
