import { Component, forwardRef, Injector, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseFormElementComponent } from 'src/app/components/meta-components/form-components/base-form-element.component';

@Component({
  selector: 'jb-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerComponent),
      multi: true,
    },
  ],
})
export class TimePickerComponent
  extends BaseFormElementComponent
  implements OnInit
{
  protected selectedTime: Date;

  constructor(public override readonly injector: Injector) {
    super(injector);
  }

  public ngOnInit(): void {}

  public onTimeChange(event: Date): void {
    const time: string = this.formTime(event.getHours(), event.getMinutes());
    this.onChange(time);
    this.onTouched();
  }

  private formTime(hour: number, minute: number): string {
    let hourString: string =
      hour < 10 ? '0' + hour.toString() : hour.toString();
    let minuteString: string =
      minute < 10 ? '0' + minute.toString() : minute.toString();

    return hourString + ':' + minuteString;
  }

  public override writeValue(value: any): void {
    // If value is valid, update the model
    this.value = value || null;
    let date = new Date(Date.now());
    const [hours, minutes] = value;
    date.setHours(hours, minutes, 0, 0);
    this.selectedTime = new Date(date);
  }
}
