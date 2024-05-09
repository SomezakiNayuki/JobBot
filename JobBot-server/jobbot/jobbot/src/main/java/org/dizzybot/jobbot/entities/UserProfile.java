package org.dizzybot.jobbot.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;
import org.dizzybot.jobbot.enums.GenderEnum;

@Entity
@Getter
@Setter
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public String name;

    public String phone;

    @Min(18)
    @Max(100)
    public int age;

    public GenderEnum gender;

//    public List<SkillEnum> skills;
//
//    public File resume;
//
//    public LocalDateTime availableTimes;

    /**
     * Empty constructor for Spring Boot Bean
     */
    public UserProfile() {}

}
