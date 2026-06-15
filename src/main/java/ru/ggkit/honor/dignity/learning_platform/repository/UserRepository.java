package ru.ggkit.honor.dignity.learning_platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.ggkit.honor.dignity.learning_platform.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

}
