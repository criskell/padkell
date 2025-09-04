package com.criskell.padkell.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.criskell.padkell.entity.Category;
import com.criskell.padkell.repository.CategoryRepository;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Optional<Category> findById(Long id) {
        return categoryRepository.findById(id);
    }
}
