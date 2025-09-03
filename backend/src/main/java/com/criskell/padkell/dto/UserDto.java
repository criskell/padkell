package com.criskell.padkell.dto;

import com.criskell.padkell.entity.User;

public record UserDto(Long id, String name) {
    public static UserDto map(User user) {
        return new UserDto(user.getId(), user.getName());
    }
}
