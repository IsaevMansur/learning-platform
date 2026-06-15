package ru.ggkit.honor.dignity.learning_platform.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserCreateDto(
        @NotBlank String username,
        @Email @NotBlank String email,
        @NotBlank String password) {

}
