package com.criskell.padkell.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.criskell.padkell.entity.User;
import com.criskell.padkell.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
}
