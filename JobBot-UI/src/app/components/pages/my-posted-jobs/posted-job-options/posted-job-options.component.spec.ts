import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { JobService } from 'src/app/services/job.service';
import { PostedJobOptionsComponent } from 'src/app/components/pages/my-posted-jobs/posted-job-options/posted-job-options.component';

describe('PostedJobOptionsComponent', () => {
  let component: PostedJobOptionsComponent;
  let fixture: ComponentFixture<PostedJobOptionsComponent>;

  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          TranslateModule.forRoot(),
        ],
        declarations: [PostedJobOptionsComponent],
        providers: [
          {
            provide: JobService,
            useValue: {
              deleteJob: jasmine.createSpy(),
              updateJob: {
                bind: jasmine.createSpy(),
              }
            },
          },
          {
            provide: Store,
            useValue: {
              dispatch: jasmine.createSpy(),
              select: jasmine.createSpy().and.returnValue({ subscribe: () => {} }),
            },
          },
        ],
      });
      
      fixture = TestBed.createComponent(PostedJobOptionsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toggleJobOptions', () => {
    it('should toggle job options', () => {
      expect(component.isJobOptionsOpen).toBeFalse();
      component.toggleJobOptions();
      expect(component.isJobOptionsOpen).toBeTrue();
      component.toggleJobOptions();
      expect(component.isJobOptionsOpen).toBeFalse();
    });
  });

  describe('openCreateJobModal', () => {
    it('should open create job modal', () => {
      component.jobCardModal = {
        show: jasmine.createSpy(),
      } as any;
      component.openCreateJobModal();
      expect(component.jobCardModal.show).toHaveBeenCalled();
    });
  });

  describe('deleteJob', () => {
    it('should call deleteJob function from job service with correct id', () => {
      const jobService = component['jobService'];
      const jobId = 123;
      component.deleteJob(jobId);
      expect(jobService.deleteJob).toHaveBeenCalledWith(jobId);
    });
  });
});
