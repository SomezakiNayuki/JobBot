import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, Subject, takeUntil, tap } from 'rxjs';

import { calculateTimeDifferenceInDays, dateToTime } from 'src/app/utils/time.util';
import Job from 'src/models/job.model';
import { JobActions } from 'src/app/store/actions/job/job.actions';
import { JobSelectors } from 'src/app/store/selectors/job/job.selectors';
import User from 'src/models/user.model';
import { UserSelectors } from 'src/app/store/selectors/user/user.selectors';

@Component({
  selector: 'jb-my-posted-jobs',
  templateUrl: './my-posted-jobs.component.html',
  styleUrls: ['./my-posted-jobs.component.css'],
})
export class MyPostedJobsComponent implements OnInit, OnDestroy {
  public myPostedJobs$: Observable<any>;

  private $destroy: Subject<void> = new Subject<void>();

  constructor(private readonly store: Store) {}

  public ngOnInit(): void {
    this.myPostedJobs$ = this.store.select(JobSelectors.myPostedJobs);
    this.store
      .select(UserSelectors.user)
      .pipe(
        takeUntil(this.$destroy),
        tap((user: User) => {
          if (user) {
            this.store.dispatch(
              JobActions.fetchMyPostedJobs({ userId: user.id })
            );
          }
        })
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  public onFilteredJobs(filteredJobs: Job[]): void {
    this.myPostedJobs$ = of(filteredJobs);
  }

  public onClearFilters(): void {
    this.myPostedJobs$ = this.store.select(JobSelectors.myPostedJobs);
  }

  public getRemainingDays(job: Job): number {
    return calculateTimeDifferenceInDays(job.time, dateToTime(new Date()));
  }

  public getJobStatusInfoColor(job: Job): string {
    if (this.getRemainingDays(job) < 2) {
      return 'red';
    }
    return 'teal';
  }
}

