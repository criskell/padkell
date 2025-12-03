package com.criskell.padkell.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.criskell.padkell.dto.PasteCreateDto;
import com.criskell.padkell.dto.PasteDto;
import com.criskell.padkell.dto.PasteSummaryDto;
import com.criskell.padkell.entity.Paste;
import com.criskell.padkell.entity.User;
import com.criskell.padkell.service.CategoryService;
import com.criskell.padkell.service.PasteService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/pastes")
class PasteController {

    private final PasteService pasteService;
    private final CategoryService categoryService;

    public PasteController(PasteService pasteService, CategoryService categoryService) {
        this.pasteService = pasteService;
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<PasteSummaryDto> findLatestSummaries() {
        return pasteService.findLatestSummaries();
    }

    @GetMapping("/{shortId}")
    public ResponseEntity<PasteDto> getByShortId(@PathVariable String shortId) {
        return pasteService.findByShortId(shortId)
                .map(PasteDto::map)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PasteDto> create(@Valid @RequestBody PasteCreateDto pasteDto,
            @AuthenticationPrincipal User user) {
        var category = pasteDto.categoryId() != null
            ? categoryService.findById(pasteDto.categoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"))
            : null;
        var paste = new Paste();

        paste.setBody(pasteDto.body());
        paste.setTitle(pasteDto.title());
        paste.setLanguage(pasteDto.language());
        paste.setAuthor(user);

        if (category != null) {
            paste.setCategory(category);
        }

        pasteService.save(paste);

        var pasteCreatedDto = PasteDto.map(paste);

        return ResponseEntity.status(HttpStatus.CREATED).body(pasteCreatedDto);
    }
}
