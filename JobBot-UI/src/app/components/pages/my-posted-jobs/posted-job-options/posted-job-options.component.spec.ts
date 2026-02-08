import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostedJobOptionsComponent } from 'src/app/components/pages/my-posted-jobs/posted-job-options/posted-job-options.component';

describe('PostedJobOptionsComponent', () => {
  let component: PostedJobOptionsComponent;
  let fixture: ComponentFixture<PostedJobOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostedJobOptionsComponent]
    });
    fixture = TestBed.createComponent(PostedJobOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
