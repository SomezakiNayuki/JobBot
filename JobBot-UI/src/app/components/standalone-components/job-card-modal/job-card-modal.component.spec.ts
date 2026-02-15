import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { JobActions } from 'src/app/store/actions/job/job.actions';
import { JobCardModalComponent } from 'src/app/components/standalone-components/job-card-modal/job-card-modal.component';
import { ModalComponent } from 'src/app/components/meta-components/modal/modal.component';

describe('JobCardModalComponent', () => {
  let component: JobCardModalComponent;
  let fixture: ComponentFixture<JobCardModalComponent>;
  let modalComponent: ModalComponent;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobCardModalComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(JobCardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    modalComponent = TestBed.createComponent(ModalComponent).componentInstance;
    component.jbModal = modalComponent;
    mockStore = TestBed.inject(MockStore);
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

  describe('onUploadImage', () => {
    beforeEach(() => {
      spyOn(modalComponent, 'close');
      component.jbJobPicture = jasmine.createSpyObj('JobImageComponent', [], {
        uploadImage: jasmine.createSpy(),
      });
    });

    it('should call jbJobPicture uploadImage', () => {
      component.onUploadImage(1);

      expect(component.jbJobPicture.uploadImage).toHaveBeenCalledWith(1);
    });

    it('should dispatch fetchJob action', () => {
      mockStore.dispatch = jasmine.createSpy();

      component.onUploadImage(1);

      expect(mockStore.dispatch).toHaveBeenCalledWith(JobActions.fetchJobs());
    });

    it('should close modal', () => {
      component.onUploadImage(1);

      expect(modalComponent.close).toHaveBeenCalled();
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
