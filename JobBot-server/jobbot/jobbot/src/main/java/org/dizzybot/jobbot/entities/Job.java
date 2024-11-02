package org.dizzybot.jobbot.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.dizzybot.jobbot.enums.JobStatusEnum;
import org.dizzybot.jobbot.enums.OutcomeStatusEnum;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Entity
@Getter
@Setter
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String title;

    private String description;

    @NotNull
    private double remuneration;

    @NotNull
    private LocalDateTime time; // it currently for further inner analysis usage only

    private LocalDateTime expiredDate;

    private JobStatusEnum jobStatusEnum;

    @ManyToOne
    @JoinColumn(name = "employer_id")
    private User employer;

    @ManyToOne // to be clarified
    @JoinColumn(name = "employee_id")
    private User employee;

    @OneToOne
    @JoinColumn(name = "outcome_id")
    private Outcome outcome;


    /**
     * Empty constructor for Spring Boot Bean
     */
    public Job() {
    }

    public Job(String title, double remuneration) {
        this.title = title;
        this.remuneration = remuneration;
        this.outcome = new Outcome();
    }

}
