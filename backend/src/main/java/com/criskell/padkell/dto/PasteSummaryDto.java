package com.criskell.padkell.dto;

import java.time.LocalDateTime;

public record PasteSummaryDto(
        Long id,
        String shortId,
        String title,
        Long size,
        String language,
        LocalDateTime createdAt) {

}
