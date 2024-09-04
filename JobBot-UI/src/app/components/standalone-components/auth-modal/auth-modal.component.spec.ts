import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AuthModalComponent } from 'src/app/components/standalone-components/auth-modal/auth-modal.component';
import UIEventEnum from 'src/enums/ui-event.enum';
import { UIEventService } from 'src/app/services/ui-event.service';
import { ModalComponent } from '../../meta-components/modal/modal.component';

describe('AuthModalComponent', () => {
  let authModalComponent: AuthModalComponent;
  let fixture: ComponentFixture<AuthModalComponent>;
  let uiEventService: UIEventService;
  let modalComponent: ModalComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthModalComponent);
    authModalComponent = fixture.componentInstance;
    fixture.detectChanges();

    modalComponent = TestBed.createComponent(ModalComponent).componentInstance;
    authModalComponent.jbModal = modalComponent;
    uiEventService = TestBed.inject(UIEventService);
  });

  it('should create', () => {
    expect(authModalComponent).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should subscribe to UIEventService', () => {
      spyOn(uiEventService, 'getUiEventPool$').and.returnValue(
        of(UIEventEnum.DISPLAY_AUTH_MODAL)
      );
      spyOn(modalComponent, 'show');
      authModalComponent.ngOnInit();

      expect(uiEventService.getUiEventPool$).toHaveBeenCalled();
      expect(modalComponent.show).toHaveBeenCalled();
    });
  });

  // TODO: 'OnSubmit' test should be implemented after wired with backend
});
