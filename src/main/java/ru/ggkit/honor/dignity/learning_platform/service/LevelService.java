package ru.ggkit.honor.dignity.learning_platform.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import ru.ggkit.honor.dignity.learning_platform.dto.request.LevelCreateDto;
import ru.ggkit.honor.dignity.learning_platform.dto.response.LevelResponse;
import ru.ggkit.honor.dignity.learning_platform.entity.LevelEntity;
import ru.ggkit.honor.dignity.learning_platform.exception.EntityNotFoundException;
import ru.ggkit.honor.dignity.learning_platform.mapper.LevelMapper;
import ru.ggkit.honor.dignity.learning_platform.repository.LevelRepository;

@Service
@RequiredArgsConstructor
public class LevelService {

    private final LevelRepository repoLevel;
    private final LevelMapper mapper;

    @Transactional
    public LevelResponse saveLevel(LevelCreateDto levelCreateDto) {
        LevelEntity entity = mapper.createToLevel(levelCreateDto);
        LevelEntity saved = repoLevel.save(entity);
        return mapper.levelToResponse(saved);
    }
    
    @Transactional(readOnly = true)
    public LevelResponse findLevel(long id) {
        LevelEntity level = repoLevel.findById(id).orElseThrow(() -> EntityNotFoundException.of("Level", id));
        
    }
}