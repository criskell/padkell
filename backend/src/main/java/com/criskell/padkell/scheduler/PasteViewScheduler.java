package com.criskell.padkell.scheduler;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.lang.Nullable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.criskell.padkell.entity.Paste;
import com.criskell.padkell.repository.PasteRepository;

@Component
public class PasteViewScheduler {
    private final RedisTemplate<String, Long> redisTemplate;
    private final PasteRepository pasteRepository;

    public PasteViewScheduler(PasteRepository pasteRepository, @Nullable RedisTemplate<String, Long> redisTemplate) {
        this.redisTemplate = redisTemplate;
        this.pasteRepository = pasteRepository;
    }

    @Scheduled(fixedRate = 60000) // 60s
    @Transactional
    public void persistViews() {
        Set<String> keys = redisTemplate.keys("paste:views:*");

        if (keys == null)
            return;

        for (String key : keys) {
            String shortId = key.replace("paste:views:", "");
            Long cachedViews = redisTemplate.opsForValue().getAndDelete(key);

            if (cachedViews == null || cachedViews <= 0) {
                continue;
            }

            Optional<Paste> optionalPaste = pasteRepository.findByShortId(shortId);

            if (optionalPaste.isEmpty()) {
                continue;
            }

            Paste paste = optionalPaste.get();
            paste.setViews(cachedViews);
            pasteRepository.save(paste);
        }
    }
}
