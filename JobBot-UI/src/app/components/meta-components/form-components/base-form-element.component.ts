import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Directive, Injector } from '@angular/core';

@Directive()
export class BaseFormElementComponent implements ControlValueAccessor {
  protected value: any = null;
  protected onChange: Function = (_: any) => {};
  protected onTouched: Function = () => {};
  protected _ngControl: NgControl;

  constructor(public injector: Injector) {}

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

  get formControl() {
    if (!this._ngControl) {
      this._ngControl = this.injector.get(NgControl, null);
      if (this._ngControl) {
        this._ngControl.valueAccessor = this;
      }
    }
    return this._ngControl?.control;
  }
}
