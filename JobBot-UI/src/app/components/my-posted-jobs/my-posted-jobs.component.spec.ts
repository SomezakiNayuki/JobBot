import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPostedJobsComponent } from './my-posted-jobs.component';

describe('MyPostedJobsComponent', () => {
  let component: MyPostedJobsComponent;
  let fixture: ComponentFixture<MyPostedJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyPostedJobsComponent]
    });
    fixture = TestBed.createComponent(MyPostedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
