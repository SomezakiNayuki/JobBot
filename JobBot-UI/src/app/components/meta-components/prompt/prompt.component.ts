import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'jb-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css'],
})
export class PromptComponent implements OnInit {
  @Input()
  public prompt: string = 'Warning';

  constructor() {}

  public ngOnInit(): void {}
}
