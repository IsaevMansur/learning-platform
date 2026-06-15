package ru.ggkit.honor.dignity.learning_platform.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import ru.ggkit.honor.dignity.learning_platform.entity.CipherCategory;
import ru.ggkit.honor.dignity.learning_platform.entity.LevelDifficulty;

public record LevelCreateDto(
        @NotBlank String name,
        @NotBlank String description,
        @NotNull LevelDifficulty difficulty,
        @NotNull CipherCategory category,
        @NotBlank String cipher,
        @NotBlank String answer,
        @NotNull @Positive int xpReward) {

}
