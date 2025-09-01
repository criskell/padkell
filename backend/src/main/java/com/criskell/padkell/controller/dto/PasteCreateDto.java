package com.criskell.padkell.controller.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PasteCreateDto(
                @NotBlank() @Size(max = 255) String title,
                @NotBlank() String body,
                String language) {

}
