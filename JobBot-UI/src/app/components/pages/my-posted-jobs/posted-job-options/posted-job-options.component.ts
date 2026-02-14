import { Component, Input, ViewChild } from '@angular/core';

import Job from 'src/models/job.model';
import { JobCardModalComponent } from 'src/app/components/standalone-components/job-card-modal/job-card-modal.component';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'jb-posted-job-options',
  templateUrl: './posted-job-options.component.html',
  styleUrls: ['./posted-job-options.component.css'],
})
export class PostedJobOptionsComponent {
  @ViewChild(JobCardModalComponent) jobCardModal: JobCardModalComponent;

  @Input() public job: Job;

  public isJobOptionsOpen: boolean = false;

  constructor(private readonly jobService: JobService) {}

  public toggleJobOptions(): void {
    this.isJobOptionsOpen = !this.isJobOptionsOpen;
  }

  public openCreateJobModal(): void {
    this.jobCardModal.show();
  }

  public updateJob(): Function {
    return this.jobService.updateJob.bind(this.jobService);
  }

  public deleteJob(id: number): void {
    this.jobService.deleteJob(id);
  }
}
