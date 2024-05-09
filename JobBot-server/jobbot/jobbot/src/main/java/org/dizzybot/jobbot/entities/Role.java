package org.dizzybot.jobbot.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.dizzybot.jobbot.enums.VisaEnum;
import org.springframework.util.StringUtils;

@Entity
@Getter
@Setter
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public boolean isCitizen;

    public VisaEnum visa;

    public String idCardNumber;

    /**
     * Empty constructor for Spring Boot Bean
     */
    public Role() {}

    public boolean isEligibleToWork() {
        return StringUtils.hasLength(this.idCardNumber)
                && (this.isCitizen || !this.visa.equals(VisaEnum.VISITOR));
    }

}
