package com.criskell.padkell.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.criskell.padkell.entity.Paste;
import com.criskell.padkell.service.PasteService;

@RestController
@RequestMapping("/pastes")
class PasteController {

    private final PasteService pasteService;

    public PasteController(PasteService pasteService) {
        this.pasteService = pasteService;
    }

    @GetMapping
    public List<Paste> getAll() {
        return pasteService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Paste> getById(@PathVariable Long id) {
        return pasteService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Paste create(@RequestBody Paste paste) {
        System.out.println(paste);
        return pasteService.save(paste);
    }
}
