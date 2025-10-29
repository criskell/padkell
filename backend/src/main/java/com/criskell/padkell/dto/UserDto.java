package com.criskell.padkell.dto;

import com.criskell.padkell.entity.User;

public record UserDto(Long id, String name, String providerPictureUrl) {
    public static UserDto map(User user) {
        return new UserDto(user.getId(), user.getName(), user.getProviderPictureUrl());
    }
}
