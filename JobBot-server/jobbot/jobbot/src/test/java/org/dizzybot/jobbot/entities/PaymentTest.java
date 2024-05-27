package org.dizzybot.jobbot.entities;

import org.dizzybot.jobbot.enums.VisaEnum;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class PaymentTest {
    private Payment payment;

    private Payment payment_0;

    private User userEmployer;

    private User userEmployee;

    @Before
    public void beforeEach() {
        this.userEmployee = new User("Dizzy Bot Employee", "Password", "dizzybotemployee@email.com");
        this.userEmployer = new User("Dizzy Bot Employer", "Password", "dizzybotemployer@email.com");
        this.userEmployer.setAccount(new Account(15468779464L));
        this.payment = new Payment(123.0,this.userEmployer,this.userEmployee);
        this.payment_0 = new Payment(321,this.userEmployer,this.userEmployee);
    }

    @After
    public void afterEach() {
        this.userEmployer = null;
        this.payment = null;
    }

    @Test
    public void testPaymentHistoryCreatedByUser() {
        assertNotNull(this.userEmployer.account.getPaymentHistory());
    }

    @Test
    public void testPaymentSet(){
        List<Payment> payments = this.userEmployer.account.getPaymentHistory();
        payments.add(payment);
        assertEquals(payment, this.userEmployer.account.getPaymentHistory().get(0));
        // todo: this way of adding payment history looks strange
        payments.add(payment_0);
        assertEquals(payment_0, this.userEmployer.account.getPaymentHistory().get(1));

        payments.remove(payment);
        assertEquals(payment_0, this.userEmployer.account.getPaymentHistory().get(0));
    }
}