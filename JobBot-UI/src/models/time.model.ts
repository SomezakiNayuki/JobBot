export default class Time {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;

  constructor(time: number[]) {
    this.year = time[0];
    this.month = time[1];
    this.day = time[2];
    this.hour = time[3];
    this.minute = time[4];
  }

  public toDateString(): string {
    return `${this.year}-${String(this.month).padStart(2, '0')}-${String(this.day).padStart(2, '0')}`;
  }

  public toTimeString(): string {
    return `${String(this.hour).padStart(2, '0')}:${String(this.minute).padStart(2, '0')}`;
  }

  public toString(): string {
    return `${this.toDateString()} ${this.toTimeString()}`;
  }
}
