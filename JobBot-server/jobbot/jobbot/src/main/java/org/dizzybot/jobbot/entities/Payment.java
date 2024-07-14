package org.dizzybot.jobbot.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.dizzybot.jobbot.enums.PaymentStatusEnum;

@Entity
@Getter
@Setter
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long transactionId;

    private double amount;

    @OneToOne
    @JoinColumn(name = "payer_id")
    private User payer;

    @OneToOne
    @JoinColumn(name = "payee_id")
    private User payee;

    private PaymentStatusEnum status;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    public Payment() {
    }

    // todo
    public Payment(double amount, User payer, User payee) {
        this.amount = amount;
        this.payer = payer;
        this.payee = payee;
    }
}
