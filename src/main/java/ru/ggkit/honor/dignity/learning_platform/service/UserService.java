package ru.ggkit.honor.dignity.learning_platform.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import ru.ggkit.honor.dignity.learning_platform.dto.request.UserCreateDto;
import ru.ggkit.honor.dignity.learning_platform.dto.request.UserUpdateDto;
import ru.ggkit.honor.dignity.learning_platform.dto.response.UserResponse;
import ru.ggkit.honor.dignity.learning_platform.entity.UserEntity;
import ru.ggkit.honor.dignity.learning_platform.exception.EntityNotFoundException;
import ru.ggkit.honor.dignity.learning_platform.mapper.UserMapper;
import ru.ggkit.honor.dignity.learning_platform.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repoUser;
    private final UserMapper mapper;

    @Transactional
    public UserResponse saveUser(UserCreateDto request) {
        UserEntity user = mapper.createToUser(request);
        UserEntity saved = repoUser.save(user);
        return mapper.userToResponse(saved);
    }

    @Transactional(readOnly = true)
    public UserResponse findUser(long id) {
        UserEntity found = repoUser.findById(id).orElseThrow(() -> EntityNotFoundException.of("User", id));
        return mapper.userToResponse(found);
    }

    @Transactional
    public void updateUser(UserUpdateDto request) {
        UserEntity user = repoUser.findById(request.id())
                .orElseThrow(() -> EntityNotFoundException.of("User", request.id()));
        mapper.updateFromDto(request, user);
    }
}