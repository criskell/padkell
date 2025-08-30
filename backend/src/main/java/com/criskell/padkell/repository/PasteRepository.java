package com.criskell.padkell.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.criskell.padkell.entity.Paste;

@Repository
public interface PasteRepository extends JpaRepository<Paste, Long> {
}
