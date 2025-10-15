package com.criskell.padkell.service;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;

@Component
public class MessageService {
    private final MessageSource messageSource;
    
    public MessageService(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    public String getLocalizedMessage(String messageId) {
        return messageSource.getMessage(messageId, null, LocaleContextHolder.getLocale());
    }
}
