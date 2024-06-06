package org.dizzybot.jobbot.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.CascadeType.ALL;

@Entity
@Getter
@Setter
public class Account {

    @NonNull
    private long cardNumber; // should have some constrains

    @Nullable
    private long bsb;

    @Id
    private long accountNumber; // currently using accountNumber as primary key

    @NonNull
    private double accountBalance;

    @OneToMany(mappedBy = "account", cascade = ALL)
    private List<Payment> paymentHistory = new ArrayList<Payment>();

    @OneToOne
    @JoinColumn(name = "user_Account")
    private User user;

    public Account() {
    }

    public Account(long cardNumber) {
        this.cardNumber = cardNumber;
        this.paymentHistory = new ArrayList<>();

    }
}
