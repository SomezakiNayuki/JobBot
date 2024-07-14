package org.dizzybot.jobbot.entities;

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

    @NotNull
    public String password;

    @NotNull
    public String email;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    public Role role;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    public UserProfile userProfile;


    @OneToMany(mappedBy = "employer", cascade = CascadeType.ALL)
    public List<Job> jobPosted = new ArrayList<>();

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
        this.role = new Role();
        this.userProfile = new UserProfile();
        this.jobPosted = new ArrayList<>();
        this.jobAccepted = new ArrayList<>();
        this.account = new Account();
    }

}
