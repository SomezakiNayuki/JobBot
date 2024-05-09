package org.dizzybot.jobbot.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

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

//    public List<Job> jobPosted = new ArrayList<Job>();
//
//    public List<Job> jobAccepted = new ArrayList<Job>();
//
//    @Nullable
//    public Account account;

    /**
     * Empty constructor for Spring Boot Bean
     */
    public User() {}

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = new Role();
        this.userProfile = new UserProfile();
    }

}
