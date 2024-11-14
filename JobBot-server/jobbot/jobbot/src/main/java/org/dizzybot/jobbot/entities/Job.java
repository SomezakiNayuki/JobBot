package org.dizzybot.jobbot.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.dizzybot.jobbot.enums.JobStatusEnum;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String title;

    @NotNull
    private double pay;

    @NotNull
    private String location;

    @NotNull
    private LocalDateTime time;

    @NotNull
    private String description;

    private LocalDateTime expiredDate;

    private JobStatusEnum jobStatusEnum;

    @ManyToOne
    @JoinColumn(name = "employer_id")
    private User employer;

    @ManyToOne
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

    public Job(String title, double pay, String location, LocalDateTime time, String description, User employer) {
        this.title = title;
        this.pay = pay;
        this.location = location;
        this.time = time;
        this.description = description;
        this.employer = employer;
    }

}
