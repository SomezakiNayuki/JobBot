import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AuthModalComponent } from 'src/app/components/standalone-components/auth-modal/auth-modal.component';
import UIEventEnum from 'src/enums/ui-event.enum';
import { UIEventService } from 'src/services/ui-event.service';

describe('AuthModalComponent', () => {
  let component: AuthModalComponent;
  let fixture: ComponentFixture<AuthModalComponent>;
  let uiEventService: UIEventService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    uiEventService = TestBed.inject(UIEventService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should subscribe to UIEventService', () => {
      spyOn(uiEventService, 'getUiEventPool').and.returnValue(
        of(UIEventEnum.DISPLAY_AUTH_MODAL)
      );
      component.ngOnInit();

      expect(uiEventService.getUiEventPool).toHaveBeenCalled();
    });
  });
});
