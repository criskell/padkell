package com.criskell.padkell.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.criskell.padkell.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    
}
