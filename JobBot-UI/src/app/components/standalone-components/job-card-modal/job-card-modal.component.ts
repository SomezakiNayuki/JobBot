import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { JobDetailComponent } from 'src/app/components/standalone-components/job-card-modal/job-detail/job-detail.component';
import { ModalComponent } from 'src/app/components/meta-components/modal/modal.component';
import Job from 'src/models/job.model';

@Component({
  selector: 'jb-job-card-modal',
  templateUrl: './job-card-modal.component.html',
  styleUrls: ['./job-card-modal.component.css'],
})
export class JobCardModalComponent implements OnInit {
  @ViewChild(ModalComponent) jbModal: ModalComponent;
  @ViewChild(JobDetailComponent) jbJobDetail: JobDetailComponent;

  @Input()
  public isCreate: boolean = false;
  @Input()
  public job: Job;

  constructor() {}

  public ngOnInit(): void {}

  public onSubmit(): void {
    this.jbJobDetail.submit();
  }

  public show(): void {
    this.jbModal.show();
  }

  public close(): void {
    this.jbModal.close();
  }
}
