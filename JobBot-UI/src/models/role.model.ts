import VisaEnum from 'src/enums/visa.enum';
import User from 'src/models/user.model';

// No unit test required for static model until business logic introduced.
export default class Role {
  public id: number;
  public isCitizen: boolean;
  public visa: VisaEnum;
  public idCardNumber: string;

  public user: User;

  constructor() {}

  // No getter setter required needed, directly assign value through public attributes.

  // isEligibleToWork() should fetch work validity from backend.
  // public isEligibleToWork(): boolean {}
}
