package com.criskell.padkell.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.criskell.padkell.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
