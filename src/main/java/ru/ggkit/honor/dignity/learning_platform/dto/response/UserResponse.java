package ru.ggkit.honor.dignity.learning_platform.dto.response;

import java.util.Set;

import ru.ggkit.honor.dignity.learning_platform.entity.LevelEntity;

public record UserResponse(
        long id,
        String username,
        String email,
        Integer xpSolved,
        Set<LevelEntity> solvedLevels) {

}