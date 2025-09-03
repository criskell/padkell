package com.criskell.padkell.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tb_paste")
@NoArgsConstructor
@Data
public class Paste {
    public static final int SHORT_ID_LENGTH = 8;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(unique = true, nullable = false)
    private String shortId;

    @Column(nullable = false)
    @Lob
    private String body;

    @Column(nullable = false)
    private Long size;

    @Column(nullable = false)
    private String language = "plaintext";

    private Long views = 0L;

    @ManyToOne
    private Category category;

    private LocalDateTime expiresAt;

    private LocalDateTime createdAt = LocalDateTime.now();

    public void setBody(String body) {
        this.body = body;
        this.size = (long) body.length();
    }
}
