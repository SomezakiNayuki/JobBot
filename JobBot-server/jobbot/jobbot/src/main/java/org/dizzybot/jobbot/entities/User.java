package org.dizzybot.jobbot.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.dizzybot.jobbot.enums.JobStatusEnum;
import org.springframework.lang.Nullable;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"email"})})
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    public String username;

    @JsonIgnore
    @NotNull
    public String password;

    @NotNull
    public String email;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    public Role role;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    public UserProfile userProfile;

    @JsonManagedReference
    @OneToMany(mappedBy = "employer", cascade = CascadeType.ALL)
    public List<Job> jobPosted = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    public List<Job> jobAccepted = new ArrayList<>();


    @OneToOne
    public Account account;

    /**
     * Empty constructor for Spring Boot Bean
     */
    public User() {
    }

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

}
