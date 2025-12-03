package com.criskell.padkell.security;

import java.util.Map;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.criskell.padkell.entity.User;
import com.criskell.padkell.service.UserService;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private final UserService userService;

    public CustomOAuth2UserService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        Map<String, Object> attributes = oAuth2User.getAttributes();

        User user = null;

        String oAuthProvider = userRequest.getClientRegistration().getRegistrationId();
        String accessToken = userRequest.getAccessToken().getTokenValue();

        if ("google".equals(oAuthProvider)) {
            user = userService.createOrUpdateFromGoogle(attributes);
        } else if ("github".equals(oAuthProvider)) {
            user = userService.createOrUpdateFromGitHub(attributes, accessToken);
        } else {
            throw new IllegalArgumentException("Provider not supported: " + oAuthProvider);
        }

        System.out.println("User ID: " + user.getId());

        return new DefaultOAuth2User(oAuth2User.getAuthorities(), Map.of("userId", user.getId()), "userId");
    }
}
