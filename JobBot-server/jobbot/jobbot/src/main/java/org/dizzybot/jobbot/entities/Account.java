package org.dizzybot.jobbot.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.Nullable;

import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Setter
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"accountNumber"})})
public class Account {

    @NotNull
    private long cardNumber; // should have some constrains

    private long bsb; //by default, it is allowed to be null

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private long accountNumber; // currently using accountNumber as primary key

    @NotNull
    private double accountBalance;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
    private List<Payment> paymentHistory = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Account() {
    }

    public Account(long cardNumber) {
        this.cardNumber = cardNumber;
        this.paymentHistory = new ArrayList<>();
    }
}
