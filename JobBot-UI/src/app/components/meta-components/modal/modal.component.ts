import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'jb-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input()
  public template: TemplateRef<any>;
  @Input()
  public context: any;

  public display: boolean = false;

  constructor() {}

  public ngOnInit(): void {}

  public show(): void {
    this.display = true;
  }

  public close(): void {
    this.display = false;
  }
}
