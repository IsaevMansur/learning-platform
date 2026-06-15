package ru.ggkit.honor.dignity.learning_platform.dto.response;

import ru.ggkit.honor.dignity.learning_platform.entity.CipherCategory;
import ru.ggkit.honor.dignity.learning_platform.entity.LevelDifficulty;

public record LevelResponse(
        long id,
        String name,
        String description,
        LevelDifficulty difficulty,
        CipherCategory category,
        String cipher,
        String answer,
        Integer xpReward) {

}
