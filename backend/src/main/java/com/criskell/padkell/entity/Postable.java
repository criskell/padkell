package com.criskell.padkell.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class Postable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String body;

    @Column(nullable = false, unique = true)
    private String shortId;

    @Column(nullable = false)
    private Long size;

    @Column(nullable = false)
    private String language;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
