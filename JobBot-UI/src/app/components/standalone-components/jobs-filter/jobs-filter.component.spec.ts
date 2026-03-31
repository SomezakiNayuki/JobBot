import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import Job from 'src/models/job.model';
import { JobsFilterComponent } from 'src/app/components/standalone-components/jobs-filter/jobs-filter.component';

describe('JobsFilterComponent', () => {
  let component: JobsFilterComponent;
  let fixture: ComponentFixture<JobsFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TranslateModule.forRoot(),
      ],
      declarations: [JobsFilterComponent]
    });
    fixture = TestBed.createComponent(JobsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('openLocationFilter', () => {
    it('should open location filter', () => {
      component.openLocationFilter();
      expect(component.isLocationFilterOpen).toBeTrue();
    });
  });

  describe('closeLocationFilter', () => {
    it('should close location filter and stop event propagation', () => {
      const event = jasmine.createSpyObj('Event', ['stopPropagation']);
      component.closeLocationFilter(event);
      expect(component.isLocationFilterOpen).toBeFalse();
      expect(event.stopPropagation).toHaveBeenCalled();
    });
  });

  describe('openPayFilter', () => {
    it('should open pay filter', () => {
      component.openPayFilter();
      expect(component.isPayFilterOpen).toBeTrue();
    });
  });

  describe('closePayFilter', () => {
    it('should close pay filter and stop event propagation', () => {
      const event = jasmine.createSpyObj('Event', ['stopPropagation']);
      component.closePayFilter(event);
      expect(component.isPayFilterOpen).toBeFalse();
      expect(event.stopPropagation).toHaveBeenCalled();
    });
  });

  describe('openTimeFilter', () => {
    it('should open time filter', () => {
      component.openTimeFilter();
      expect(component.isTimeFilterOpen).toBeTrue();
    });
  });

  describe('closeTimeFilter', () => {
    it('should close time filter and stop event propagation', () => {
      const event = jasmine.createSpyObj('Event', ['stopPropagation']);
      component.closeTimeFilter(event);
      expect(component.isTimeFilterOpen).toBeFalse();
      expect(event.stopPropagation).toHaveBeenCalled();
    });
  });

  describe('clearLocationFilter', () => {
    it('should clear location filter', () => {
      component.locationFilter = 'Somewhere';
      component.clearLocationFilter();
      expect(component.locationFilter).toBe('');
    });
  });

  describe('clearPayFilter', () => {
    it('should clear pay filter', () => {
      component.payFilter = { from: 100, to: 200 };
      component.clearPayFilter();
      expect(component.payFilter).toEqual({ from: null, to: null });
    });
  });

  describe('clearTimeFilter', () => {
    it('should clear time filter', () => {
      component.timeFilter = { from: '2024-01-01', to: '2024-01-02' };
      component.clearTimeFilter();
      expect(component.timeFilter).toEqual({ from: null, to: null });
    });
  });

  describe('confirmLocationFilter', () => {
    it('should confirmLocationFilter and filter jobs by location', (done) => {
      const jobs: Job[] = [
        { id: 1, location: 'A', pay: 100, time: {} as any } as Job,
        { id: 2, location: 'B', pay: 200, time: {} as any } as Job,
      ];
      component.jobs = jobs;
      component.locationFilter = 'A';
      const event = jasmine.createSpyObj('Event', ['stopPropagation']);
      component.confirmLocationFilter(event);
      component.filteredJobs.subscribe(filtered => {
        expect(filtered.length).toBe(1);
        expect(filtered[0].location).toBe('A');
        done();
      });
    });

    it('should confirmLocationFilter and clear filter if location is empty', () => {
      component.locationFilter = '';
      const event = jasmine.createSpyObj('Event', ['stopPropagation']);
      spyOn(component, 'clearLocationFilter');
      component.confirmLocationFilter(event);
      expect(component.clearLocationFilter).toHaveBeenCalled();
    });
  });

  describe('confirmPayFilter', () => {
    it('should confirmPayFilter and filter jobs by pay', (done) => {
      const jobs: Job[] = [
        { id: 1, location: 'A', pay: 100, time: {} as any } as Job,
        { id: 2, location: 'B', pay: 200, time: {} as any } as Job,
        { id: 3, location: 'C', pay: 300, time: {} as any } as Job,
      ];
      component.jobs = jobs;
      component.payFilter = { from: 150, to: 250 };
      const event = jasmine.createSpyObj('Event', ['stopPropagation']);
      component.confirmPayFilter(event);
      component.filteredJobs.subscribe(filtered => {
        expect(filtered.length).toBe(1);
        expect(filtered[0].pay).toBe(200);
        done();
      });
    });

    it('should confirmPayFilter and clear filter if both from and to are null', () => {
      component.payFilter = { from: null, to: null };
      const event = jasmine.createSpyObj('Event', ['stopPropagation']);
      spyOn(component, 'clearPayFilter');
      component.confirmPayFilter(event);
      expect(component.clearPayFilter).toHaveBeenCalled();
    });
  });

  // TODO: Update tests for time filter using time utils to compare time
  describe('confirmTimeFilter', () => {
    it('should confirmTimeFilter and clear filter if both from and to are null', () => {
      component.timeFilter = { from: null, to: null };
      const event = jasmine.createSpyObj('Event', ['stopPropagation']);
      spyOn(component, 'clearTimeFilter');
      component.confirmTimeFilter(event);
      expect(component.clearTimeFilter).toHaveBeenCalled();
    });
  });
});
