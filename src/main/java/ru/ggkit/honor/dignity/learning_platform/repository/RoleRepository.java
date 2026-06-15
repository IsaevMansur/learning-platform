package ru.ggkit.honor.dignity.learning_platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ru.ggkit.honor.dignity.learning_platform.entity.RoleEntity;

public interface RoleRepository extends JpaRepository<RoleEntity, Long> {

    @Query("select exists (select 1 from RoleEntity r where r.name in ('ADMIN', 'STUDENT'))")
    boolean existsRequired();
}
