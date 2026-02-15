import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { JobDetailComponent } from 'src/app/components/standalone-components/job-card-modal/job-detail/job-detail.component';
import { JobService } from 'src/app/services/job.service';
import Time from 'src/models/time.model';

describe('JobDetailComponent', () => {
  let component: JobDetailComponent;
  let fixture: ComponentFixture<JobDetailComponent>;
  let jobService: jasmine.SpyObj<JobService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [JobDetailComponent],
      providers: [
        {
          provide: JobService,
          useValue: {
            postJob: jasmine.createSpy(),
          },
        },
        {
          provide: Store,
          useValue: {
            dispatch: jasmine.createSpy(),
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
    it('should init job form if editMode is true and job is not provided', () => {
      component.editMode = true;
      component.job = null
      component.ngOnInit();

      expect(component.jobDetailForm.get('title')).not.toBeNull();
      expect(component.jobDetailForm.get('pay')).not.toBeNull();
      expect(component.jobDetailForm.get('location')).not.toBeNull();
      expect(component.jobDetailForm.get('date')).not.toBeNull();
      expect(component.jobDetailForm.get('time')).not.toBeNull();
      expect(component.jobDetailForm.get('description')).not.toBeNull();
    });

    it('should init job form if editMode is true and job is provided', () => {
      component.editMode = true;
      component.job = {
        id: 1,
        title: 'Test Job',
        pay: 50000,
        location: 'Test Location',
        time: new Time([2024, 10, 31, 23, 0]),
        description: 'Test Description',
      } as any;
      component.ngOnInit();

      expect(component.jobDetailForm.get('title').value).toEqual('Test Job');
      expect(component.jobDetailForm.get('pay').value).toEqual(50000);
      expect(component.jobDetailForm.get('location').value).toEqual('Test Location');
      expect(component.jobDetailForm.get('date').value).toEqual('2024-10-31');
      expect(component.jobDetailForm.get('time').value).toEqual('23:00');
      expect(component.jobDetailForm.get('description').value).toEqual('Test Description');
    });
  });

  describe('submit', () => {
    it('should check form validity', () => {
      setUpMockAuthFormValidity(false);
      component.submitFunction = jasmine.createSpy();

      component.submit();

      expect(component.jobDetailForm.markAllAsTouched).toHaveBeenCalled();
    });

    it('should post job', () => {
      setUpMockAuthFormValidity(true);
      component.submitFunction = jasmine.createSpy().and.returnValue(Promise.resolve({ payload: 1 }));

      component.submit();

      expect(component.submitFunction).toHaveBeenCalled();
    });

    it('should emit onSubmitSuccess event on success post job', fakeAsync(() => {
      setUpMockAuthFormValidity(true);
      component.onSubmitSuccess = jasmine.createSpyObj('EventEmitter', [], {
        emit: jasmine.createSpy(),
      });
      component.submitFunction = jasmine.createSpy().and.returnValue(
        Promise.resolve({
          payload: 1,
        })
      );

      component.submit();
      tick();

      expect(component.submitFunction).toHaveBeenCalled();
      expect(component.onSubmitSuccess.emit).toHaveBeenCalledWith(1);
    }));

    it('should handle error message on fail post job', fakeAsync(() => {
      setUpMockAuthFormValidity(true);
      component.submitFunction = jasmine.createSpy().and.returnValue(Promise.reject({ error: { message: 'Error message' } }));

      component.submit();
      tick();

      expect(component.submitFunction).toHaveBeenCalled();
      expect(component.jobDetailFormError).toEqual('Error message');
    }));
  });

  function setUpMockAuthFormValidity(valid: boolean) {
    component.jobDetailForm = jasmine.createSpyObj('FormGroup', ['markAllAsTouched', 'get'], {
      valid: valid,
    });
    (component.jobDetailForm.get as jasmine.Spy).and.returnValue({
      reset: jasmine.createSpy(),
    });
  }
});
