import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCardComponent } from 'src/app/components/standalone-components/job-card/job-card.component';
import { JobCardModalComponent } from 'src/app/components/standalone-components/job-card-modal/job-card-modal.component';

describe('JobCardComponent', () => {
  let component: JobCardComponent;
  let fixture: ComponentFixture<JobCardComponent>;
  let jobCardModal: JobCardModalComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JobCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    jobCardModal = TestBed.createComponent(
      JobCardModalComponent
    ).componentInstance;
    component.jobCardModal = jobCardModal;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('openCreateJobModal', () => {
    it('should call jobCardModal show()', () => {
      spyOn(jobCardModal, 'show');

      component.openCreateJobModal();

      expect(component.jobCardModal.show).toHaveBeenCalledWith();
    });
  });
});
