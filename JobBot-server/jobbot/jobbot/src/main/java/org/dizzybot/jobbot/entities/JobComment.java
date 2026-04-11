package org.dizzybot.jobbot.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class JobComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    public User author;

    @OneToOne
    @JoinColumn(name = "reply_to_user_id")
    public User replyToUser;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "job_id")
    public Job job;

    @NotNull
    public String content;

    public JobComment() {
    }

    public JobComment(String content, Job job, User replyToUser, User author) {
        this.content = content;
        this.job = job;
        this.replyToUser = replyToUser;
        this.author = author;
    }

}
