import OutcomeStatusEnum from 'src/enums/outcome-status.enum';

// No unit test required for static model until business logic introduced.
export default class Outcome {
  public id: number;
  public images: File[];
  public description: string;
  public status: OutcomeStatusEnum;

  public Outcome() {}

  // No getter setter required needed, directly assign value through public attributes.

  // public verify(): void {}
}
