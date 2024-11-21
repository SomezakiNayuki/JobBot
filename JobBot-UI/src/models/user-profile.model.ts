import GenderEnum from 'src/enums/gender.enum';
import SkillEnum from 'src/enums/skill.enum';
import User from 'src/models/user.model';

// No unit test required for static model until business logic introduced.
export default class UserProfile {
  public id: number;
  public name: string;
  public phone: string;
  public age: number;
  public gender: GenderEnum;
  public skills: SkillEnum[];
  public resume: File;
  public availabelTimes: Date;

  public user: User;

  constructor() {}

  // No getter setter required until needed, directly assign value through public attributes.
}
