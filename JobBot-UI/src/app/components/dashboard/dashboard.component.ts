import { Component, OnInit } from '@angular/core';
import { map, Subject, takeUntil } from 'rxjs';

import Job from 'src/models/job.model';
import { JobSelectors } from 'src/app/store/selectors/job/job.selectors';
import { JobActions } from 'src/app/store/actions/job/job.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'jb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public jobListLeft: Job[];
  public jobListRight: Job[];

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly store: Store) {}

  public ngOnInit(): void {
    this.store
      .select(JobSelectors.job)
      .pipe(
        takeUntil(this.destroy$),
        map((jobs) => {
          this.jobListLeft = [];
          this.jobListRight = [];
          for (let i = 0; i < jobs.length; i++) {
            if (i % 2 === 0) {
              this.jobListLeft.push(jobs[i]);
            } else {
              this.jobListRight.push(jobs[i]);
            }
          }
        })
      )
      .subscribe();

    this.store.dispatch(JobActions.fetchJob());
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
