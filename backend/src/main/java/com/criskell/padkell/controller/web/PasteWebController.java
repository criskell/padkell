package com.criskell.padkell.controller.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.criskell.padkell.service.MessageService;
import com.criskell.padkell.service.PasteService;

@Controller
@RequestMapping("/web/pastes")
public class PasteWebController {
    private final PasteService pasteService;
    private final MessageService messageService;

    public PasteWebController(PasteService pasteService, MessageService messageService) {
        this.pasteService = pasteService;
        this.messageService = messageService;
    }

    @GetMapping("/{pasteId}")
    public String show(@PathVariable String pasteId, Model model) {
        var paste = pasteService.findByShortId(pasteId).orElseThrow(() ->
            new RuntimeException(messageService.getLocalizedMessage("paste.not-found")));

        model.addAttribute("paste", paste);

        return "show";
    }
}
