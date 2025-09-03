package com.criskell.padkell.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import com.criskell.padkell.entity.Paste;
import com.criskell.padkell.repository.PasteRepository;

@Service
public class PasteViewService {
    private final PasteRepository pasteRepository;
    private final RedisTemplate<String, Long> redisTemplate;

    public PasteViewService(PasteRepository pasteRepository, @Nullable RedisTemplate<String, Long> redisTemplate) {
        this.pasteRepository = pasteRepository;
        this.redisTemplate = redisTemplate;
    }

    public void incrementView(String shortId) {
        String key = "paste:views:" + shortId;

        if (redisTemplate != null) {
            Long currentValue = redisTemplate.opsForValue().get(key);

            if (currentValue == null) {
                redisTemplate.opsForValue().setIfAbsent(key,
                        pasteRepository.findByShortId(shortId).map(Paste::getViews).orElse(0L));
            }

            redisTemplate.opsForValue().increment(key, 1);

            return;
        }

        pasteRepository.incrementViews(shortId, 1L);
    }

    public Long getViews(String shortId) {
        if (redisTemplate == null) {
            Long views = redisTemplate.opsForValue().get("paste:views:" + shortId);

            if (views != null) {
                return views;
            }
        }

        return pasteRepository.findByShortId(shortId).map(Paste::getViews).orElse(0L);
    }
}
