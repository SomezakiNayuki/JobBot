package org.dizzybot.jobbot.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @JsonIgnore
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

    public Role(boolean isCitizen, VisaEnum visa, String idCardNumber) {
        this.isCitizen = isCitizen;
        this.visa = visa;
        this.idCardNumber = idCardNumber;
    }

    public boolean isEligibleToWork() {
        return StringUtils.hasLength(this.idCardNumber)
                && (this.isCitizen || !this.visa.equals(VisaEnum.VISITOR));
    }

}
