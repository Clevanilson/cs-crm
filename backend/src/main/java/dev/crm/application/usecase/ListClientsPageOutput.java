package dev.crm.application.usecase;

import java.util.List;

public record ListClientsPageOutput(
    List<ListClientsOutput> items,
    long total,
    int page,
    int size
) {}
