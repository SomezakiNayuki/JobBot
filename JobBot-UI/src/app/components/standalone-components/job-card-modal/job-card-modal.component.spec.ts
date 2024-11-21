import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCardModalComponent } from 'src/app/components/standalone-components/job-card-modal/job-card-modal.component';
import { ModalComponent } from 'src/app/components/meta-components/modal/modal.component';

describe('JobCardModalComponent', () => {
  let component: JobCardModalComponent;
  let fixture: ComponentFixture<JobCardModalComponent>;
  let modalComponent: ModalComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobCardModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JobCardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    modalComponent = TestBed.createComponent(ModalComponent).componentInstance;
    component.jbModal = modalComponent;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  describe('show', () => {
    it('should call modal component show()', () => {
      spyOn(modalComponent, 'show');

      component.show();

      expect(component.jbModal.show).toHaveBeenCalled();
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
