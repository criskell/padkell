package com.criskell.padkell.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.criskell.padkell.entity.Paste;

@Repository
public interface PasteRepository extends JpaRepository<Paste, Long> {

    List<Paste> findTop10ByOrderByCreatedAtDesc();

    Optional<Paste> findByShortId(String shortId);

    @Modifying
    @Transactional
    @Query("UPDATE Paste p SET p.views = p.views + :increment WHERE p.shortId = :shortId")
    void incrementViews(@Param("shortId") String shortId, @Param("increment") Long increment);
}
