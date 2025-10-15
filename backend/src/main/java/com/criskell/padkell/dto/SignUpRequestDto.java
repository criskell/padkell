package com.criskell.padkell.dto;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequestDto {
    @NotBlank(message = "{signUp.name.notBlank}")
    private String name;

    @NotBlank(message = "{signUp.email.notBlank}")
    @Email(message = "{signUp.email.email}")
    private String email;

    @NotBlank(message = "{signUp.password.notBlank}")
    @Length(min = 8, message = "{signUp.password.length}")
    private String password;
}
