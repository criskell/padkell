package com.criskell.padkell.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.criskell.padkell.dto.PasteSummaryDto;
import com.criskell.padkell.entity.Paste;
import com.criskell.padkell.repository.PasteRepository;
import com.criskell.padkell.util.RandomIdGenerator;

import jakarta.persistence.EntityManager;

@Service
public class PasteService {

    private final PasteRepository pasteRepository;
    private final PasteViewService pasteViewService;

    public PasteService(PasteRepository pasteRepository, PasteViewService pasteViewService) {
        this.pasteRepository = pasteRepository;
        this.pasteViewService = pasteViewService;
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

        return pasteRepository.findByShortId(shortId);
    }
}
