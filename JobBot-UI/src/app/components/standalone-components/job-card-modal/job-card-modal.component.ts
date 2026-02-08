import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import { JobDetailComponent } from 'src/app/components/standalone-components/job-card-modal/job-detail/job-detail.component';
import Job from 'src/models/job.model';
import { JobPictureComponent } from './job-picture/job-picture.component';
import { JobActions } from 'src/app/store/actions/job/job.actions';
import { ModalComponent } from 'src/app/components/meta-components/modal/modal.component';

@Component({
  selector: 'jb-job-card-modal',
  templateUrl: './job-card-modal.component.html',
  styleUrls: ['./job-card-modal.component.css'],
})
export class JobCardModalComponent implements OnInit {
  @ViewChild(ModalComponent) jbModal: ModalComponent;
  @ViewChild(JobDetailComponent) jbJobDetail: JobDetailComponent;
  @ViewChild(JobPictureComponent) jbJobPicture: JobPictureComponent;

  @Input()
  public createMode: boolean = false;
  @Input()
  public viewOnlyMode: boolean = false;
  @Input()
  public job: Job;
  @Input()
  public submitFunction: Function | null = null;

  constructor(private readonly store: Store) {}

  public ngOnInit(): void {}

  public onSubmit(): void {
    this.jbJobDetail.submit();
  }

  public onUploadImage(id: number): void {
    this.jbJobPicture.uploadImage(id);
    this.store.dispatch(JobActions.fetchJob());
    this.close();
  }

  public show(): void {
    this.jbModal.show();
  }

  public close(): void {
    this.jbModal.close();
  }
}
