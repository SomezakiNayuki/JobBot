import Role from 'src/models/role.model';
import UserProfile from 'src/models/user-profile.model';

// No unit test required for static model until business logic introduced.
export default class User {
  public id: number;
  public username: string;
  public email: string;
  public role: Role;
  public userProfile: UserProfile;
  // public jobPosted: Job[];
  // public jobAccepted: Job[];
  // public account: Account;

  public User() {}

  // No getter setter required needed, directly assign value through public attributes.
}
