import JobStatusEnum from "src/enums/job-status.enum";
import User from "src/models/user.model";

// No unit test required for static model until business logic introduced.
export default class Job {
  public id: number;
  public title: string;
  public description: string;
  public renumeration: number;
  public time: Date;
  public status: JobStatusEnum;
  public employer: User;
  public employee: User;
  public outcome: Outcome;


  public Job() {}

  // No getter setter required needed, directly assign value through public attributes.
}