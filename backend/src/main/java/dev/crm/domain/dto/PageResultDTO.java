package dev.crm.domain.dto;

import java.util.List;

public record PageResultDTO<T>(List<T> items, long total) {}
