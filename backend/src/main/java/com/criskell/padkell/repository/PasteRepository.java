package com.criskell.padkell.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.criskell.padkell.entity.Paste;

@Repository
public interface PasteRepository extends JpaRepository<Paste, Long> {

    List<Paste> findTop10ByOrderByCreatedAtDesc();

    Optional<Paste> findByShortId(String shortId);
}
