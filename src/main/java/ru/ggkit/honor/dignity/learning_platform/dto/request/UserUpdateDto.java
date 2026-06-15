package ru.ggkit.honor.dignity.learning_platform.dto.request;

import java.util.Set;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import ru.ggkit.honor.dignity.learning_platform.entity.LevelEntity;

public record UserUpdateDto(
        @Positive long id,
        @NotBlank String username,
        @Email @NotBlank String email,
        @NotNull String password,
        @NotNull @Positive Integer xpSolved,
        @Size(min = 1) @NotNull Set<LevelEntity> solvedLevels) {

}
