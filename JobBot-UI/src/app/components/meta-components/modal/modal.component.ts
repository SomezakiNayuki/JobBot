import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
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

  public display: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  public ngOnInit(): void {}

  public show(): void {
    this.display = true;
    // Detect change and rerender view, otherwise renderer cannot find element as it's not rendered
    this.cdr.detectChanges();
    // Make sure animation is rendered in the next callstack
    setTimeout(() => {
      let modalEl: ElementRef = this.el.nativeElement.querySelector('#modal');
      this.renderer.addClass(modalEl, 'visible');
    });
  }

  public close(): void {
    let modalEl: ElementRef = this.el.nativeElement.querySelector('#modal');
    this.renderer.removeClass(modalEl, 'visible');
    setTimeout(() => {
      this.display = false;
    }, 80); // To cater fade out animation transition time
  }
}
