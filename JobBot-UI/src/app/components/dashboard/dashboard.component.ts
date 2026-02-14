import { Component, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import DashboardJobs from 'src/common-types/dashboard-jobs.type';
import { JobActions } from 'src/app/store/actions/job/job.actions';
import { JobSelectors } from 'src/app/store/selectors/job/job.selectors';

@Component({
  selector: 'jb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private $destroy: Subject<void> = new Subject<void>();
  public jobs$: Observable<DashboardJobs>;

  constructor(private readonly store: Store) {}

  public ngOnInit(): void {
    this.jobs$ = this.store
      .select(JobSelectors.jobs)
      .pipe(takeUntil(this.$destroy));
    this.store.dispatch(JobActions.fetchJobs());
  }

  public ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
