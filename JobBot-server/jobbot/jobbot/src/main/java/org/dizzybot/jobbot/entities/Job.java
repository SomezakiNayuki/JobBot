package org.dizzybot.jobbot.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.dizzybot.jobbot.enums.JobStatusEnum;
import org.dizzybot.jobbot.enums.OutcomeStatusEnum;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.Date;

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
    private Date time; // post time?

    private Date expiredDate;

    private JobStatusEnum jobStatusEnum;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User employer;

    @OneToOne // to be clarified
    @JoinColumn(name = "user_id")
    private User employee;

    @OneToOne
    @JoinColumn(name = "outcome_id")
    private Outcome outcome;

    @ManyToOne
    @JoinColumn(name = "user_jobPosted")
    private User userPost; // todo

    @ManyToOne
    @JoinColumn(name = "user_jobAccepted")
    private User userAccept; // todo


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
