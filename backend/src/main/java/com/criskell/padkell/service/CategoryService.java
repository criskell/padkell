package com.criskell.padkell.service;

import java.util.List;

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
}
