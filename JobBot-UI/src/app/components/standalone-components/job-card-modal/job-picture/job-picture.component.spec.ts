import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPictureComponent } from 'src/app/components/standalone-components/job-card-modal/job-picture/job-picture.component';

describe('JobPictureComponent', () => {
  let component: JobPictureComponent;
  let fixture: ComponentFixture<JobPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobPictureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JobPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
