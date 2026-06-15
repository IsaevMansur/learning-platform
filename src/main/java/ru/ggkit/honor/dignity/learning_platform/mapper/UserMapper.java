package ru.ggkit.honor.dignity.learning_platform.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import ru.ggkit.honor.dignity.learning_platform.dto.request.UserCreateDto;
import ru.ggkit.honor.dignity.learning_platform.dto.request.UserUpdateDto;
import ru.ggkit.honor.dignity.learning_platform.dto.response.UserResponse;
import ru.ggkit.honor.dignity.learning_platform.entity.UserEntity;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target="password", ignore = true)
    UserEntity createToUser(UserCreateDto request);

    
    @Mapping(target = "id", ignore = true)
    UserEntity updateToUser(UserUpdateDto dto);

    
    UserResponse userToResponse(UserEntity saved);

    void updateFromDto(UserUpdateDto dto, @MappingTarget UserEntity userEntity);
}