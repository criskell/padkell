package com.criskell.padkell.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

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
    
    @Transactional
    public User createOrUpdateFromGitHub(Map<String, Object> attributes, String accessToken) {
        String email = (String) attributes.get("email");
        String id = String.valueOf(attributes.get("id"));
        String name = (String) attributes.get("name");
        String login = (String) attributes.get("login");
        String avatarUrl = (String) attributes.get("avatar_url");

        if (email == null || email.isEmpty()) {
            email = fetchPrimaryEmailFromGitHub(accessToken);
        }

        User user = userRepository.findByEmail(email).orElseGet(User::new);

        user.setProviderExternalId(id);
        user.setEmail(email);
        user.setName(name != null ? name : login);
        user.setProviderPictureUrl(avatarUrl);

        return userRepository.save(user);
    }

    private String fetchPrimaryEmailFromGitHub(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                "https://api.github.com/user/emails",
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<List<Map<String, Object>>>() {}
            );

            return response.getBody().stream()
                .filter(emailData -> Boolean.TRUE.equals(emailData.get("primary"))
                    && Boolean.TRUE.equals(emailData.get("verified")))
                .map(emailData -> (String) emailData.get("email"))
                .findFirst()
                .orElse(null);
        } catch (Exception e) {
            return null;
        }
    }
}
