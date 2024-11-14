import { BaseFormElementComponent } from 'src/app/components/meta-components/form-components/base-form-element.component';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'jb-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})
export class TextareaComponent
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

  ngOnInit(): void {}
}
