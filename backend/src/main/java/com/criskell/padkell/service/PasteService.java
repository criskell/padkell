package com.criskell.padkell.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.criskell.padkell.dto.PasteSummaryDto;
import com.criskell.padkell.dto.PasteUpdateDto;
import com.criskell.padkell.entity.Paste;
import com.criskell.padkell.entity.User;
import com.criskell.padkell.repository.PasteRepository;
import com.criskell.padkell.util.RandomIdGenerator;

@Service
public class PasteService {

    private final PasteRepository pasteRepository;
    private final PasteViewService pasteViewService;
    private final CategoryService categoryService;

    public PasteService(PasteRepository pasteRepository, PasteViewService pasteViewService, CategoryService categoryService) {
        this.pasteRepository = pasteRepository;
        this.pasteViewService = pasteViewService;
        this.categoryService = categoryService;
    }

    public List<PasteSummaryDto> findLatestSummaries() {
        return pasteRepository.findTop10ByOrderByCreatedAtDesc()
                .stream()
                .map(p -> new PasteSummaryDto(
                        p.getId(),
                        p.getShortId(),
                        p.getTitle(),
                        p.getSize(),
                        p.getLanguage(),
                        p.getCreatedAt()))
                .toList();
    }

    public Paste save(Paste paste) {
        paste.setShortId(RandomIdGenerator.generateShortId(Paste.SHORT_ID_LENGTH));
        return pasteRepository.save(paste);
    }

    public Optional<Paste> findById(Long id) {
        return pasteRepository.findById(id);
    }

    public Optional<Paste> findByShortId(String shortId) {
        pasteViewService.incrementView(shortId);

        return pasteRepository.findByShortId(shortId).map((paste) -> {
            paste.setViews(pasteViewService.getViews(shortId));
            return paste;
        });
    }

    public Optional<Paste> updatePartial(String shortId, PasteUpdateDto dto, User user) {
        return pasteRepository.findByShortId(shortId).map(paste -> {
            if (dto.title() != null) {
                paste.setTitle(dto.title());
            }

            if (dto.body() != null) {
                paste.setBody(dto.body());
            }

            if (dto.language() != null) {
                paste.setLanguage(dto.language());
            }

            if (dto.categoryId() != null) {
                var category = categoryService.findById(dto.categoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));

                paste.setCategory(category);
            }

            paste.setAuthor(user);

            pasteRepository.save(paste);
            return paste;
        });
    } 
}
