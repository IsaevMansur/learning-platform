package ru.ggkit.honor.dignity.learning_platform.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import ru.ggkit.honor.dignity.learning_platform.dto.request.LevelCreateDto;
import ru.ggkit.honor.dignity.learning_platform.dto.response.LevelResponse;
import ru.ggkit.honor.dignity.learning_platform.entity.LevelEntity;

@Mapper(componentModel = "spring")
public interface LevelMapper {

    @Mapping(target = "id", ignore = false)
    LevelEntity createToLevel(LevelCreateDto levelCreateDto);

    LevelResponse levelToResponse(LevelEntity saved);
}