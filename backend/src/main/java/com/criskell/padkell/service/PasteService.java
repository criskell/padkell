package com.criskell.padkell.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.criskell.padkell.dto.PasteSummaryDto;
import com.criskell.padkell.entity.Paste;
import com.criskell.padkell.repository.PasteRepository;

@Service
public class PasteService {

    private final PasteRepository pasteRepository;

    public PasteService(PasteRepository pasteRepository) {
        this.pasteRepository = pasteRepository;
    }

    public List<PasteSummaryDto> findLatestSummaries() {
        return pasteRepository.findTop10ByOrderByCreatedAtDesc()
                .stream()
                .map(p -> new PasteSummaryDto(
                        p.getId(),
                        p.getTitle(),
                        p.getSize(),
                        p.getLanguage(),
                        p.getCreatedAt()))
                .toList();
    }

    public Paste save(Paste paste) {
        return pasteRepository.save(paste);
    }

    public Optional<Paste> findById(Long id) {
        return pasteRepository.findById(id);
    }
}
