package org.dizzybot.jobbot.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.dizzybot.jobbot.enums.JobStatusEnum;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
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

    @JsonIgnore
    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<JobImage> images = new ArrayList<>();

    @JsonIgnore
    private LocalDateTime expiredDate;

    private JobStatusEnum jobStatusEnum;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "employer_id")
    private User employer;

    @JsonIgnore
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
