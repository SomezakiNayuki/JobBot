import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseFormElementComponent } from 'src/app/components/meta-components/form-components/base-form-element.component';

@Component({
  selector: 'jb-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent extends BaseFormElementComponent implements OnInit {
  @Input()
  public border: boolean = true;
  @Input()
  public placeholder: string;

  @Input()
  public type: string = 'text';
  @Input()
  public width: string = '100%';
  @Input()
  public height: string = '50px';

  public ngOnInit(): void {}
}
