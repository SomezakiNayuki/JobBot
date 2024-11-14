import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCardComponent } from 'src/app/components/standalone-components/job-card/job-card.component';
import { UIEventService } from 'src/app/services/ui-event.service';
import UIEventEnum from 'src/enums/ui-event.enum';

describe('JobCardComponent', () => {
  let component: JobCardComponent;
  let fixture: ComponentFixture<JobCardComponent>;
  let uiEventService: UIEventService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JobCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    uiEventService = TestBed.inject(UIEventService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('openCreateJobModal', () => {
    it('should emit UIEventEnum.DISPLAY_CREATE_JOB_MODAL and config { isCreate: false }', () => {
      spyOn(uiEventService, 'next');

      component.openCreateJobModal();

      expect(uiEventService.next).toHaveBeenCalledWith(
        UIEventEnum.DISPLAY_CREATE_JOB_MODAL,
        { isCreate: false }
      );
    });
  });
});
