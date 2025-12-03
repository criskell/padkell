package com.criskell.padkell.dto;

import jakarta.validation.constraints.Size;

public record PasteUpdateDto (
    @Size(max = 255) String title,
    String body,
    String language,
    Long categoryId
) {}
