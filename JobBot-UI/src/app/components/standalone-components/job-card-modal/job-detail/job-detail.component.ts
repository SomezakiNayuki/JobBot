import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import Job from 'src/models/job.model';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'jb-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css'],
})
export class JobDetailComponent implements OnInit {
  @Input()
  public createMode: boolean = false;
  @Input()
  public jobCardMode: boolean = false;
  @Input()
  public job: Job;

  @Output()
  public onCreateJobSuccess: EventEmitter<number> = new EventEmitter<number>();

  public jobDetailForm: FormGroup;
  public jobDetailFormError: string;

  constructor(
    private readonly jobService: JobService,
  ) {}

  public ngOnInit(): void {
    if (this.createMode) {
      this.initJobForm();
    }
  }

  public initJobForm(): void {
    this.jobDetailForm = new FormGroup({
      jobTitle: new FormControl('', [Validators.required]),
      pay: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  public submit(): void {
    if (!this.jobDetailForm.valid) {
      this.jobDetailForm.markAllAsTouched();
      return;
    }

    this.jobService
      .postJob(this.jobDetailForm.value)
      .then(response => {
        this.onPostSuccess(response.payload);
      })
      .catch((error) => {
        this.jobDetailFormError = error.error?.message;
      });
  }

  private onPostSuccess(jobId: number): void {
    this.onCreateJobSuccess.emit(jobId);
  }

  public formatJobTime(jobTime: any): string {
    if (jobTime == null) {
      return '';
    }

    const date: string = `${jobTime[0]}-${jobTime[1]}-${jobTime[2]}`;
    const time: string =
      (jobTime[3] < 10 ? `0${jobTime[3]}` : `${jobTime[3]}`) +
      ':' +
      (jobTime[4] < 10 ? `0${jobTime[4]}` : `${jobTime[4]}`);
    return date + ' ' + time;
  }
}
