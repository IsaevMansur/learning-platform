package ru.ggkit.honor.dignity.learning_platform.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class LevelEntity {

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private LevelDifficulty difficulty;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CipherCategory category;

    @Column(nullable = false)
    private String cipher;

    @Column(nullable= false)
    private String answer;

    @Column(nullable = false)
    private Integer xpReward;
}
