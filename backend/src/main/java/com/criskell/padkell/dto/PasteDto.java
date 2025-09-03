package com.criskell.padkell.dto;

import java.time.LocalDateTime;

import com.criskell.padkell.entity.Category;
import com.criskell.padkell.entity.Paste;
import com.criskell.padkell.entity.User;

public record PasteDto(
        Long id,
        String title,
        String shortId,
        String body,
        Long size,
        String language,
        Long views,
        Category category,
        UserDto author,
        LocalDateTime expiresAt,
        LocalDateTime createdAt) {
    public static PasteDto map(Paste paste) {
        var author = paste.getAuthor();
        var authorDto = author == null ? null : UserDto.map(author);

        return new PasteDto(
                paste.getId(),
                paste.getTitle(),
                paste.getShortId(),
                paste.getBody(), paste.getSize(),
                paste.getLanguage(),
                paste.getViews(),
                paste.getCategory(),
                authorDto,
                paste.getExpiresAt(),
                paste.getCreatedAt());
    }
}
