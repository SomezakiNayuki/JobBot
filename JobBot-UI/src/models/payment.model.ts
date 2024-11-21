import PaymentStatusEnum from 'src/enums/payment-status.enum';
import User from 'src/models/user.model';

// No unit test required for static model until business logic introduced.
export default class Payment {
  public id: number;
  public transactionId: number;
  public payer: User;
  public payee: User;
  public status: PaymentStatusEnum;

  constructor() {}

  // No getter setter required needed, directly assign value through public attributes.
}
