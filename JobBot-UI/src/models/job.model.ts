import JobStatusEnum from 'src/enums/job-status.enum';
import User from 'src/models/user.model';
import Outcome from 'src/models/outcome.model';
import Time from 'src/models/time.model';

// No unit test required for static model until business logic introduced.
export default class Job {
  public id: number;
  public title: string;
  public description: string;
  public location: string;
  public pay: number;
  public time: Time;
  public jobStatusEnum: JobStatusEnum;
  public employer: User;
  public employee: User;
  public outcome: Outcome;

  constructor() {}

  // No getter setter required needed, directly assign value through public attributes.
}
