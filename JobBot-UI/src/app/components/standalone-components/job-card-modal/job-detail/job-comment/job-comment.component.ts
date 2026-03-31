import { Component, Input } from '@angular/core';

@Component({
  selector: 'jb-job-comment',
  templateUrl: './job-comment.component.html',
  styleUrls: ['./job-comment.component.css']
})
export class JobCommentComponent {
  @Input() postMode: boolean = true;

  public isReplyInputOpen: boolean = false;

  constructor() {}

  public toggleReplyInput(): void {
    this.isReplyInputOpen = !this.isReplyInputOpen;
  }
}
