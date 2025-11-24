import { Component } from '@angular/core';

@Component({
  selector: 'jb-my-posted-jobs',
  templateUrl: './my-posted-jobs.component.html',
  styleUrls: ['./my-posted-jobs.component.css'],
})
export class MyPostedJobsComponent {
  public isLocationFilterOpen: boolean = false;
  public isPayFilterOpen: boolean = false;
  public isTimeFilterOpen: boolean = false;
  public isJobOptionsOpen: boolean = false;

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

  public toggleJobOptions(): void {
    this.isJobOptionsOpen = !this.isJobOptionsOpen;
  }
}
