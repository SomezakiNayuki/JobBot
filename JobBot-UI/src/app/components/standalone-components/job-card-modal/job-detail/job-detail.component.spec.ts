import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { JobDetailComponent } from 'src/app/components/standalone-components/job-card-modal/job-detail/job-detail.component';
import { JobService } from 'src/app/services/job.service';

describe('JobDetailComponent', () => {
  let component: JobDetailComponent;
  let fixture: ComponentFixture<JobDetailComponent>;
  let jobService: jasmine.SpyObj<JobService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobDetailComponent],
      providers: [
        {
          provide: JobService,
          useValue: {
            postJob: jasmine.createSpy(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JobDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    jobService = TestBed.inject(JobService) as jasmine.SpyObj<JobService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should init job form if isCreate is true', () => {
      component.isCreate = true;
      component.initJobForm();

      expect(component.jobDetailForm.get('jobTitle')).not.toEqual(null);
      expect(component.jobDetailForm.get('pay')).not.toEqual(null);
      expect(component.jobDetailForm.get('location')).not.toEqual(null);
      expect(component.jobDetailForm.get('time')).not.toEqual(null);
      expect(component.jobDetailForm.get('description')).not.toEqual(null);
    });
  });

  describe('submit', () => {
    it('should check form validity', () => {
      setUpMockAuthFormValidity(false);

      component.submit();

      expect(component.jobDetailForm.markAllAsTouched).toHaveBeenCalled();
    });

    it('should post job', () => {
      setUpMockAuthFormValidity(true);
      jobService.postJob.and.returnValue(Promise.resolve());

      component.submit();

      expect(jobService.postJob).toHaveBeenCalled();
    });

    it('should emit onCreateJobSuccess event on success post job', fakeAsync(() => {
      setUpMockAuthFormValidity(true);
      component.onCreateJobSuccess = jasmine.createSpyObj('EventEmitter', [], {
        emit: jasmine.createSpy(),
      });
      jobService.postJob.and.returnValue(Promise.resolve());

      component.submit();
      tick();

      expect(jobService.postJob).toHaveBeenCalled();
      expect(component.onCreateJobSuccess.emit).toHaveBeenCalled();
    }));

    it('should handle error message on fail post job', fakeAsync(() => {
      setUpMockAuthFormValidity(true);
      jobService.postJob.and.returnValue(
        Promise.reject({
          error: {
            message: 'Error message',
          },
        })
      );

      component.submit();
      tick();

      expect(jobService.postJob).toHaveBeenCalled();
      expect(component.jobDetailFormError).toEqual('Error message');
    }));
  });

  function setUpMockAuthFormValidity(valid: boolean) {
    component.jobDetailForm = jasmine.createSpyObj('FormGroup', [], {
      valid: valid,
      markAllAsTouched: jasmine.createSpy(),
      get: jasmine.createSpy().and.returnValue({
        reset: jasmine.createSpy(),
      }),
    });
  }
});
