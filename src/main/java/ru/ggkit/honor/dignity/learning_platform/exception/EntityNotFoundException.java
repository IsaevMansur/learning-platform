package ru.ggkit.honor.dignity.learning_platform.exception;

public class EntityNotFoundException extends RuntimeException {

    public static EntityNotFoundException of(String entityName, long id) {
        return new EntityNotFoundException("%s by ID=%d not found.".formatted(entityName, id));
    }

    public EntityNotFoundException(String message) {
        super(message);
    }
}
