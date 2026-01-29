import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { MyPostedJobsComponent } from 'src/app/components/pages/my-posted-jobs/my-posted-jobs.component';

describe('MyPostedJobsComponent', () => {
  let component: MyPostedJobsComponent;
  let fixture: ComponentFixture<MyPostedJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyPostedJobsComponent],
      imports: [
        TranslateModule.forRoot(), // <-- real translate pipe and service
      ],
    });
    fixture = TestBed.createComponent(MyPostedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open location filter', () => {
    component.openLocationFilter();
    expect(component.isLocationFilterOpen).toBeTrue();
  });

  it('should close location filter and stop event propagation', () => {
    const event = jasmine.createSpyObj('Event', ['stopPropagation']);
    component.closeLocationFilter(event);
    expect(component.isLocationFilterOpen).toBeFalse();
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should open pay filter', () => {
    component.openPayFilter();
    expect(component.isPayFilterOpen).toBeTrue();
  });

  it('should close pay filter and stop event propagation', () => {
    const event = jasmine.createSpyObj('Event', ['stopPropagation']);
    component.closePayFilter(event);
    expect(component.isPayFilterOpen).toBeFalse();
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should open time filter', () => {
    component.openTimeFilter();
    expect(component.isTimeFilterOpen).toBeTrue();
  });

  it('should close time filter and stop event propagation', () => {
    const event = jasmine.createSpyObj('Event', ['stopPropagation']);
    component.closeTimeFilter(event);
    expect(component.isTimeFilterOpen).toBeFalse();
    expect(event.stopPropagation).toHaveBeenCalled();
  });
});
