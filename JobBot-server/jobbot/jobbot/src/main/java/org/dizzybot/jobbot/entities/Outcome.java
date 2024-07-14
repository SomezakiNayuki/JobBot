package org.dizzybot.jobbot.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.dizzybot.jobbot.enums.OutcomeStatusEnum;


import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Setter
public class Outcome {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "outcome", cascade = CascadeType.ALL)
    public List<ProductImage> images = new ArrayList<>();

    private String description;

    private OutcomeStatusEnum status;

    @OneToOne
    @JoinColumn(name = "job_outcome")
    private Job job;

    public Outcome() {
    }

    public void verify() {
        // return this.status == OutcomeStatusEnum.COMPLETED;
    } //todo
}
