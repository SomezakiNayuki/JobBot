import { BaseFormElementComponent } from 'src/app/components/meta-components/form-components/base-form-element.component';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'jb-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent
  extends BaseFormElementComponent
  implements OnInit
{
  @Input()
  public border: boolean = true;
  @Input()
  public placeholder: string;
  @Input()
  public actionList: string[];
  protected filteredActionList: string[];

  @Input()
  public type: string = 'select';
  @Input()
  public width: string = '100%';
  @Input()
  public height: string = '50px';

  protected collapsed: boolean = true;

  public ngOnInit(): void {}

  protected switchCollapseDropdownList(): void {
    this.collapsed = !this.collapsed;
  }

  protected onClickDropdownAction(action: string): void {
    this.formControl.setValue(action);
    this.formControl.updateValueAndValidity();
    this.collapsed = true;
    this.filteredActionList = null;
  }

  protected onTyping(value: string): void {
    this.filterAction(value);
  }

  private filterAction(value: string): void {
    this.filteredActionList = this.actionList.filter((action) =>
      action.includes(value)
    );
  }
}