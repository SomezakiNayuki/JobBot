import { ControlValueAccessor } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive()
export class BaseFormElementComponent implements ControlValueAccessor {
  protected value: any;
  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor() {}

  public writeValue(value: any): void {
    this.value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {}

  public onInput(event: any): void {
    this.onChange(event.target.value);
  }
}
