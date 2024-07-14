package org.dizzybot.jobbot.entities;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class PaymentTest {
    private Payment payment;

    private Payment payment_0;

    private User payer;

    private User payee;

    @Before
    public void beforeEach() {
        this.payee = new User("Dizzy Bot Employee", "Password", "dizzybotemployee@email.com");
        this.payer = new User("Dizzy Bot Employer", "Password", "dizzybotemployer@email.com");
        this.payer.setAccount(new Account(15468779464L));
        this.payment = new Payment(123.0, this.payer, this.payee);
        this.payment_0 = new Payment(321, this.payer, this.payee);
    }

    @After
    public void afterEach() {
        this.payer = null;
        this.payment = null;
    }

    @Test
    public void testPaymentHistoryCreatedByUser() {
        assertNotNull(this.payer.account.getPaymentHistory());
    }

    @Test
    public void testPaymentSet() {
        List<Payment> payments = this.payer.account.getPaymentHistory();
        payments.add(payment);
        assertEquals(payment, this.payer.account.getPaymentHistory().get(0));
        // todo: this way of adding payment history looks strange
        payments.add(payment_0);
        assertEquals(payment_0, this.payer.account.getPaymentHistory().get(1));

        payments.remove(payment);
        assertEquals(payment_0, this.payer.account.getPaymentHistory().get(0));
    }
}