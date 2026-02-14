import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { JobActions } from 'src/app/store/actions/job/job.actions';
import { JobSelectors } from 'src/app/store/selectors/job/job.selectors';
import { compareTime, convertDateStringToArray } from 'src/app/utils/time.util';
import Job from 'src/models/job.model';

@Component({
  selector: 'jb-my-posted-jobs',
  templateUrl: './my-posted-jobs.component.html',
  styleUrls: ['./my-posted-jobs.component.css'],
})
export class MyPostedJobsComponent implements OnInit {
  public isLocationFilterOpen: boolean = false;
  public isPayFilterOpen: boolean = false;
  public isTimeFilterOpen: boolean = false;
  public payFilter: { from: number | null; to: number | null } = { from: null, to: null };
  public locationFilter: string = '';
  public timeFilter: { from: string | null; to: string | null } = { from: null, to: null };

  public myPostedJobs$: Observable<any>;

  constructor(
    private readonly store: Store,
    private readonly userService: UserService,
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(JobActions.fetchMyPostedJobs({ userId: this.userService.getUser().id }));
    this.myPostedJobs$ = this.store.select(JobSelectors.myPostedJobs);
  }

  public openLocationFilter(): void {
    this.isLocationFilterOpen = true;
  }

  public confirmLocationFilter($event: Event): void {
    this.isLocationFilterOpen = false;
    $event.stopPropagation();

    if (!this.locationFilter) {
      this.clearLocationFilter($event);
      return;
    }

    this.myPostedJobs$ = this.store.select(JobSelectors.myPostedJobs).pipe(
      map((jobs: Job[]) => {
        return jobs.filter(job => job.location === this.locationFilter);
      })
    );
  }

  public clearLocationFilter($event: Event): void {
    this.locationFilter = '';
    this.myPostedJobs$ = this.store.select(JobSelectors.myPostedJobs);
    $event.stopPropagation();
  }

  public closeLocationFilter($event: Event): void {
    this.isLocationFilterOpen = false;
    $event.stopPropagation();
  }

  public openPayFilter(): void {
    this.isPayFilterOpen = true;
  }

  public confirmPayFilter($event: Event): void {
    this.isPayFilterOpen = false;
    $event.stopPropagation();

    if (!this.payFilter.from && !this.payFilter.to) {
      this.clearPayFilter($event);
      return;
    }

    this.myPostedJobs$ = this.store.select(JobSelectors.myPostedJobs).pipe(
      map((jobs: Job[]) => {
        return jobs.filter(job => {
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

  public clearPayFilter($event: Event): void {
    this.payFilter = { from: null, to: null };
    this.myPostedJobs$ = this.store.select(JobSelectors.myPostedJobs);
    $event.stopPropagation();
  }

  public closePayFilter($event: Event): void {
    this.isPayFilterOpen = false;
    $event.stopPropagation();
  }

  public openTimeFilter(): void {
    this.isTimeFilterOpen = true;
  }

  public confirmTimeFilter($event: Event): void {
    this.isTimeFilterOpen = false;
    $event.stopPropagation();
    if (!this.timeFilter.from && !this.timeFilter.to) {
      this.clearTimeFilter($event);
      return;
    }
    this.myPostedJobs$ = this.store.select(JobSelectors.myPostedJobs).pipe(
      map((jobs: Job[]) => {
        return jobs.filter(job => {
          const jobTimeArray = [job.time[0], job.time[1], job.time[2]];
          if (this.timeFilter.from !== null
            && compareTime(jobTimeArray, convertDateStringToArray(this.timeFilter.from)) > 0
            && compareTime(jobTimeArray, convertDateStringToArray(this.timeFilter.to)) < 0)
          {
            return true;
          }
          return false;
        });
      })
    );
  }

  public clearTimeFilter($event: Event): void {
    this.timeFilter = { from: null, to: null };
    this.myPostedJobs$ = this.store.select(JobSelectors.myPostedJobs);
    $event.stopPropagation();
  }

  public closeTimeFilter($event: Event): void {
    this.isTimeFilterOpen = false;
    $event.stopPropagation();
  }
}

