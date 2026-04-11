import { Component, EventEmitter, Input, Output } from '@angular/core';

import { compareDate, convertDateStringToTimeObject } from 'src/app/utils/time.util';
import Job from 'src/models/job.model';

@Component({
  selector: 'jb-jobs-filter',
  templateUrl: './jobs-filter.component.html',
  styleUrls: ['./jobs-filter.component.css']
})
export class JobsFilterComponent {
  /**
   * For close filter functions in this component,
   * event.stopPropagation() is used to prevent the click event from bubbling up to parent elements,
   * which could trigger unintended behaviors such as opening the filter dropdown again immediately after closing it,
   * this is due to control buttons are inside a clickable parent element that expands the dropdown.
   */

  @Input() public jobs: Job[];
  @Output() public filteredJobs: EventEmitter<Job[]> = new EventEmitter<Job[]>();
  @Output() public clearFilters: EventEmitter<void> = new EventEmitter<void>();

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

  constructor() {}

  public openLocationFilter(): void {
    this.isLocationFilterOpen = true;
  }

  public confirmLocationFilter(event: Event): void {
    this.closeLocationFilter(event);

    if (!this.locationFilter) {
      this.clearLocationFilter();
      return;
    }

    this.filteredJobs.emit(
      this.jobs.filter((job) =>
        job.location.toLowerCase().includes(this.locationFilter.toLowerCase())
      )
    );
  }

  public clearLocationFilter(): void {
    this.locationFilter = '';
    this.resetFilters();
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

    this.filteredJobs.emit(this.jobs.filter((job) => {
        if (this.payFilter.from !== null && job.pay < this.payFilter.from) {
          return false;
        }
        if (this.payFilter.to !== null && job.pay > this.payFilter.to) {
          return false;
        }
        return true;
      })
    );
  }

  public clearPayFilter(): void {
    this.payFilter = { from: null, to: null };
    this.resetFilters();
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

    this.filteredJobs.emit(
      this.jobs.filter((job) => {
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
      })
    );
  }

  public clearTimeFilter(): void {
    this.timeFilter = { from: null, to: null };
    this.resetFilters();
  }

  public closeTimeFilter(event: Event): void {
    this.isTimeFilterOpen = false;
    event.stopPropagation();
  }

  private resetFilters(): void {
    this.clearFilters.emit();
  }
}
