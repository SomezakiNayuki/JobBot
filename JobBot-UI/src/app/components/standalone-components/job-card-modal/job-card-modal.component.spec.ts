import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { JobCardModalComponent } from 'src/app/components/standalone-components/job-card-modal/job-card-modal.component';
import { ModalComponent } from 'src/app/components/meta-components/modal/modal.component';
import { UIEventService } from 'src/app/services/ui-event.service';
import UIEventEnum from 'src/enums/ui-event.enum';

describe('JobCardModalComponent', () => {
  let component: JobCardModalComponent;
  let fixture: ComponentFixture<JobCardModalComponent>;
  let modalComponent: ModalComponent;
  let uiEventService: UIEventService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobCardModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JobCardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    modalComponent = TestBed.createComponent(ModalComponent).componentInstance;
    component.jbModal = modalComponent;
    uiEventService = TestBed.inject(UIEventService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should subscribe to UIEventService', () => {
      spyOn(uiEventService, 'getUiEventPool$').and.returnValue(
        of({ UIEventEnum: UIEventEnum.DISPLAY_CREATE_JOB_MODAL })
      );
      spyOn(modalComponent, 'show');
      component.ngOnInit();

      expect(uiEventService.getUiEventPool$).toHaveBeenCalled();
      expect(modalComponent.show).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should emit destroy$', () => {
      spyOn(component['destroy$'], 'next');
      spyOn(component['destroy$'], 'complete');

      component.ngOnDestroy();

      expect(component['destroy$'].next).toHaveBeenCalled();
      expect(component['destroy$'].complete).toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    it('should call jbJobDetail submit', () => {
      component.jbJobDetail = jasmine.createSpyObj('JobDetailComponent', [], {
        submit: jasmine.createSpy(),
      });

      component.onSubmit();

      expect(component.jbJobDetail.submit).toHaveBeenCalled();
    });
  });

  describe('close', () => {
    it('should close modal', () => {
      spyOn(modalComponent, 'close');

      component.close();

      expect(modalComponent.close).toHaveBeenCalled();
    });
  });
});
