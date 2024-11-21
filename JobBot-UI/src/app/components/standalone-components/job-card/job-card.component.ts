import { Component, Input, OnInit, ViewChild } from '@angular/core';

import Job from 'src/models/job.model';
import { JobCardModalComponent } from 'src/app/components/standalone-components/job-card-modal/job-card-modal.component';

@Component({
  selector: 'jb-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css'],
})
export class JobCardComponent implements OnInit {
  @ViewChild(JobCardModalComponent) jobCardModal: JobCardModalComponent;

  @Input()
  public blank: boolean = false;
  @Input()
  public job: Job;

  constructor() {}

  public ngOnInit(): void {}

  public openCreateJobModal(): void {
    if (this.blank) {
      return;
    }

    this.jobCardModal.show();
  }
}
