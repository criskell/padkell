package com.criskell.padkell.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tb_paste")
@NoArgsConstructor
@Data
public class Paste {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Lob
    private String body;

    private String syntaxHighlight = "Java";

    private LocalDateTime expiresAt;

    private LocalDateTime createdAt = LocalDateTime.now();
}
