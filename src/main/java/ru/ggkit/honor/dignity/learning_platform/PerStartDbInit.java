package ru.ggkit.honor.dignity.learning_platform;

import java.util.Optional;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import ru.ggkit.honor.dignity.learning_platform.entity.RoleEntity;
import ru.ggkit.honor.dignity.learning_platform.entity.RoleKind;
import ru.ggkit.honor.dignity.learning_platform.entity.UserEntity;
import ru.ggkit.honor.dignity.learning_platform.repository.RoleRepository;
import ru.ggkit.honor.dignity.learning_platform.repository.UserRepository;

@Component
@RequiredArgsConstructor
public class PerStartDbInit implements ApplicationRunner {

    private final UserRepository repoUser;
    private final RoleRepository repoRole;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        defineRequiredUsers();
        defineRequiredRoles();
    }

    private void defineRequiredRoles() {
        if (!repoRole.existsRequired()) {
            var admin = new RoleEntity();
            admin.setName(RoleKind.ADMIN);
            var simpleRole = new RoleEntity();
            simpleRole.setName(RoleKind.STUDENT);
            repoRole.saveAll(null);
        }
    }

    private void defineRequiredUsers() {
        Optional<UserEntity> found = repoUser.findById(1L);
        if (found.isPresent()) {
            UserEntity userEntity = found.get();
            if (!"ADMIN".equals(userEntity.getUsername())) {
                UserEntity requiredEntity = new UserEntity();
                repoUser.save(requiredEntity);
            }
        } else {
            UserEntity requiredEntity = new UserEntity();
            repoUser.save(requiredEntity);
        }
    }
}