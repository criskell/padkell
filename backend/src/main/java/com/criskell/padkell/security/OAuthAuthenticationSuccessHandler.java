package com.criskell.padkell.security;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class OAuthAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    private final JwtUtil jwtUtil;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    public OAuthAuthenticationSuccessHandler(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String continueUrl = request.getParameter("continue");

        if (continueUrl != null) {
            response.sendRedirect(continueUrl);
            return;
        }
        
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Long userId = Long.parseLong(oAuth2User.getName());

        String token = jwtUtil.generateToken(userId);
        String redirectUrl = frontendUrl + "/oauth2?token=" + URLEncoder.encode(token, StandardCharsets.UTF_8);

        response.sendRedirect(redirectUrl);
    }
}
