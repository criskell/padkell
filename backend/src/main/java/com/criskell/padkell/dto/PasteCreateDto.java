package com.criskell.padkell.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PasteCreateDto(
        @NotBlank() @Size(max = 255) String title,
        @NotBlank() String body,
        @NotBlank() String language) {

}
