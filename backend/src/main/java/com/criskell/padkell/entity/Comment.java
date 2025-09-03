package com.criskell.padkell.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity()
@Table(name = "tb_comment")
public class Comment extends Postable {
    @ManyToOne
    private Paste paste;
}
