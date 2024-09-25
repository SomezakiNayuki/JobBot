import Payment from 'src/models/payment.model';

// No unit test required for static model until business logic introduced.
export default class Account {
  public id: number;
  public cardNumber: number;
  public bsb: number;
  public accountNumber: number;
  public accountBalance: number;
  public paymentHistory: Payment[];

  public Account() {}

  // No getter setter required needed, directly assign value through public attributes.
}
