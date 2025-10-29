package com.criskell.padkell.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public User createOrUpdateFromGoogle(Map<String, Object> attributes) {
        String email = (String) attributes.get("email");
        String sub = (String) attributes.get("sub");
        String name = (String) attributes.get("name");
        String pictureUrl = (String) attributes.get("picture");

        User user = userRepository.findByEmail(email).orElseGet(User::new);

        user.setProviderExternalId(sub);
        user.setEmail(email);
        user.setName(name);
        user.setProviderPictureUrl(pictureUrl);

        return userRepository.save(user);
    }
}
