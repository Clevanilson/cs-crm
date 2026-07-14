package dev.crm.di;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import dev.crm.application.usecase.ListClients;
import dev.crm.application.usecase.SaveClient;
import dev.crm.infra.repository.ClientDatabaseRepository;

@Configuration
public class ClientDI {
    @Autowired
    private ClientDatabaseRepository repository;

    @Bean
    public ListClients listClients() {
        return new ListClients(this.repository);
    }

    @Bean
    public SaveClient saveClient() {
        return new SaveClient(this.repository);
    }
}
