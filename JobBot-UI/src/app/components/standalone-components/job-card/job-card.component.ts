import { Component, OnInit } from '@angular/core';

import { UIEventService } from 'src/app/services/ui-event.service';
import UIEventEnum from 'src/enums/ui-event.enum';

@Component({
  selector: 'jb-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css'],
})
export class JobCardComponent implements OnInit {
  constructor(private readonly uiEvent: UIEventService) {}

  public ngOnInit(): void {}

  public openCreateJobModal(): void {
    this.uiEvent.next(UIEventEnum.DISPLAY_CREATE_JOB_MODAL, {
      isCreate: false,
    });
  }
}
