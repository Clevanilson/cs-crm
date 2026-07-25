package dev.crm.application.usecase;

import java.util.List;

import dev.crm.domain.dto.PaginationOutput;

public record ListClientsPageOutput(
    List<ListClientsOutput> data,
    PaginationOutput pagination
) {}
