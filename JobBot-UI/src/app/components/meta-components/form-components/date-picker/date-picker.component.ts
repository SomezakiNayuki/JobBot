import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseFormElementComponent } from 'src/app/components/meta-components/form-components/base-form-element.component';

@Component({
  selector: 'jb-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent
  extends BaseFormElementComponent
  implements OnInit
{
  @Input()
  public border: boolean = true;
  @Input()
  public placeholder: string;

  @Input()
  public width: string = '100%';
  @Input()
  public height: string = '50px';

  public ngOnInit(): void {}

  public onDateChange(event: Date): void {
    const date: string = this.formDate(event);
    this.onChange(date); // Pass the selected date to onChange
    this.onTouched(); // Mark the control as touched
  }

  private formDate(date: Date): string {
    return (
      date.getFullYear().toString() +
      '-' +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      '-' + // Month is zero-indexed, so add 1
      date.getDate().toString().padStart(2, '0')
    ); // getDate() for the day of the month
  }

  public override writeValue(value: any): void {
    // If value is valid, update the model
    this.value = value || null;
  }
}
