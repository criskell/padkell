package com.criskell.padkell.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.criskell.padkell.controller.dto.PasteCreateDto;
import com.criskell.padkell.dto.PasteSummaryDto;
import com.criskell.padkell.entity.Paste;
import com.criskell.padkell.service.PasteService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/pastes")
class PasteController {

    private final PasteService pasteService;

    public PasteController(PasteService pasteService) {
        this.pasteService = pasteService;
    }

    @GetMapping
    public List<PasteSummaryDto> findLatestSummaries() {
        return pasteService.findLatestSummaries();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Paste> getById(@PathVariable Long id) {
        return pasteService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Paste create(@Valid @RequestBody PasteCreateDto pasteDto) {
        Paste paste = new Paste();

        paste.setBody(pasteDto.body());
        paste.setTitle(pasteDto.title());

        return pasteService.save(paste);
    }
}
