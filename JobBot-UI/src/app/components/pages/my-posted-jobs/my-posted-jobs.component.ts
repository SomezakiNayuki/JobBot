import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { JobActions } from 'src/app/store/actions/job/job.actions';
import { JobSelectors } from 'src/app/store/selectors/job/job.selectors';

@Component({
  selector: 'jb-my-posted-jobs',
  templateUrl: './my-posted-jobs.component.html',
  styleUrls: ['./my-posted-jobs.component.css'],
})
export class MyPostedJobsComponent implements OnInit {
  public isLocationFilterOpen: boolean = false;
  public isPayFilterOpen: boolean = false;
  public isTimeFilterOpen: boolean = false;

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

  public closeLocationFilter($event: Event): void {
    this.isLocationFilterOpen = false;
    $event.stopPropagation();
  }

  public openPayFilter(): void {
    this.isPayFilterOpen = true;
  }

  public closePayFilter($event: Event): void {
    this.isPayFilterOpen = false;
    $event.stopPropagation();
  }

  public openTimeFilter(): void {
    this.isTimeFilterOpen = true;
  }

  public closeTimeFilter($event: Event): void {
    this.isTimeFilterOpen = false;
    $event.stopPropagation();
  }
}
