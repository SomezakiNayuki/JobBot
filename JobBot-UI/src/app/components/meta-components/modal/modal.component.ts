import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';

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

  @Output()
  public closeEvent: EventEmitter<void> = new EventEmitter<void>();

  public display: boolean = false;
  public visible: boolean = false;

  constructor() {}

  public ngOnInit(): void {}

  public show(): void {
    this.display = true;
    
    // allow DOM to render first
    requestAnimationFrame(() => {
      this.visible = true;
    });
  }

  public close(): void {
    this.visible = false;
  }

  onTransitionEnd(event: TransitionEvent) {
    if (!this.visible) {
      this.display = false; // remove AFTER fade-out
      this.closeEvent.emit();
    }
  }
}
