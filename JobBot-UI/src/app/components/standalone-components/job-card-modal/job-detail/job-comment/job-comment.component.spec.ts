import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCommentComponent } from './job-comment.component';

describe('JobCommentComponent', () => {
  let component: JobCommentComponent;
  let fixture: ComponentFixture<JobCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobCommentComponent]
    });
    fixture = TestBed.createComponent(JobCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
