import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'jb-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css'],
})
export class JobDetailComponent implements OnInit {
  @Input()
  public isCreate: boolean = false;

  @Output()
  public onCreateJobSuccess: EventEmitter<any> = new EventEmitter<any>();

  public jobDetailForm: FormGroup;
  public jobDetailFormError: string;

  constructor(private readonly jobService: JobService) {}

  public ngOnInit(): void {
    if (this.isCreate) {
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
      .then(() => {
        this.onPostSuccess();
      })
      .catch((error) => {
        this.jobDetailFormError = error.error?.message;
      });
  }

  private onPostSuccess(): void {
    this.onCreateJobSuccess.emit();
  }
}
