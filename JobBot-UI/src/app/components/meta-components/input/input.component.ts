import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'jb-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input()
  public placeholder: string;
  @Input()
  public type: string = 'text';
  @Input()
  public border: boolean = true;
  @Input()
  public width: string = '100%';
  @Input()
  public height: string = '50px';

  constructor() {}

  ngOnInit(): void {}
}
