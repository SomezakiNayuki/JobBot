import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import Job from 'src/models/job.model';

@Component({
  selector: 'jb-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class JobDetailComponent implements OnInit {
  @Input()
  public editMode: boolean = false;
  @Input()
  public jobCardMode: boolean = false;
  @Input()
  public job: Job;
  @Input()
  public submitFunction: Function | null = null;

  @Output()
  public onSubmitSuccess: EventEmitter<number> = new EventEmitter<number>();

  public jobDetailForm: FormGroup;
  public jobDetailFormError: string;

  constructor() {}

  public ngOnInit(): void {
    if (this.editMode) {
      if (this.job) {
        this.loadJobFormFromJob(this.job);
      } else {
        this.initJobForm();
      }
    }
  }

  public initJobForm(): void {
    this.jobDetailForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      pay: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  public loadJobFormFromJob(job: Job): void {
    this.jobDetailForm = new FormGroup({
      id: new FormControl(job.id),
      title: new FormControl(job.title, [Validators.required]),
      pay: new FormControl(job.pay, [Validators.required]),
      location: new FormControl(job.location, [Validators.required]),
      date: new FormControl(job.time.toDateString(), [Validators.required]),
      time: new FormControl(job.time.toTimeString(), [Validators.required]),
      description: new FormControl(job.description, [Validators.required]),
    });
  }

  public submit(): void {
    if (this.submitFunction == null) {
      console.error('Submit function is not provided.');
      return;
    }

    if (!this.jobDetailForm.valid) {
      this.jobDetailForm.markAllAsTouched();
      return;
    }

    this.submitFunction(this.jobDetailForm.value)
      .then((response) => {
        this.handleSubmitSuccess(response.payload);
      })
      .catch((error) => {
        this.jobDetailFormError = error.error?.message;
      });
  }

  private handleSubmitSuccess(jobId: number): void {
    this.onSubmitSuccess.emit(jobId);
  }
}
