import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subject, takeUntil, tap } from 'rxjs';

import {
  compareDate,
  convertDateStringToTimeObject,
} from 'src/app/utils/time.util';
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
  /**
   * For close filter functions in this component,
   * event.stopPropagation() is used to prevent the click event from bubbling up to parent elements,
   * which could trigger unintended behaviors such as opening the filter dropdown again immediately after closing it,
   * this is due to control buttons are inside a clickable parent element that expands the dropdown.
   */

  public isLocationFilterOpen: boolean = false;
  public isPayFilterOpen: boolean = false;
  public isTimeFilterOpen: boolean = false;

  // Filters
  public payFilter: { from: number | null; to: number | null } = {
    from: null,
    to: null,
  };
  public locationFilter: string = '';
  public timeFilter: { from: string | null; to: string | null } = {
    from: null,
    to: null,
  };

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

  public openLocationFilter(): void {
    this.isLocationFilterOpen = true;
  }

  public confirmLocationFilter(event: Event): void {
    this.closeLocationFilter(event);

    if (!this.locationFilter) {
      this.clearLocationFilter();
      return;
    }

    this.myPostedJobs$ = this.store.select(JobSelectors.myPostedJobs).pipe(
      map((jobs: Job[]) => {
        return jobs.filter((job) => job.location === this.locationFilter);
      })
    );
  }

  public clearLocationFilter(): void {
    this.locationFilter = '';
    this.myPostedJobs$ = this.store.select(JobSelectors.myPostedJobs);
  }

  public closeLocationFilter(event: Event): void {
    this.isLocationFilterOpen = false;
    event.stopPropagation();
  }

  public openPayFilter(): void {
    this.isPayFilterOpen = true;
  }

  public confirmPayFilter(event: Event): void {
    this.closePayFilter(event);

    if (!this.payFilter.from && !this.payFilter.to) {
      this.clearPayFilter();
      return;
    }

    this.myPostedJobs$ = this.store.select(JobSelectors.myPostedJobs).pipe(
      map((jobs: Job[]) => {
        return jobs.filter((job) => {
          if (this.payFilter.from !== null && job.pay < this.payFilter.from) {
            return false;
          }
          if (this.payFilter.to !== null && job.pay > this.payFilter.to) {
            return false;
          }
          return true;
        });
      })
    );
  }

  public clearPayFilter(): void {
    this.payFilter = { from: null, to: null };
    this.myPostedJobs$ = this.store.select(JobSelectors.myPostedJobs);
  }

  public closePayFilter(event: Event): void {
    this.isPayFilterOpen = false;
    event.stopPropagation();
  }

  public openTimeFilter(): void {
    this.isTimeFilterOpen = true;
  }

  public confirmTimeFilter(event: Event): void {
    this.closeTimeFilter(event);

    if (!this.timeFilter.from && !this.timeFilter.to) {
      this.clearTimeFilter();
      return;
    }

    this.myPostedJobs$ = this.store.select(JobSelectors.myPostedJobs).pipe(
      map((jobs: Job[]) => {
        return jobs.filter((job) => {
          if (
            this.timeFilter.from !== null &&
            compareDate(
              job.time,
              convertDateStringToTimeObject(this.timeFilter.from)
            ) > 0 &&
            compareDate(
              job.time,
              convertDateStringToTimeObject(this.timeFilter.to)
            ) < 0
          ) {
            return true;
          }
          return false;
        });
      })
    );
  }

  public clearTimeFilter(): void {
    this.timeFilter = { from: null, to: null };
    this.myPostedJobs$ = this.store.select(JobSelectors.myPostedJobs);
  }

  public closeTimeFilter(event: Event): void {
    this.isTimeFilterOpen = false;
    event.stopPropagation();
  }
}
