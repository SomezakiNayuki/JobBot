import { TestBed } from '@angular/core/testing';
import UIEventEnum from 'src/enums/ui-event.enum';

import { UIEventService } from 'src/services/ui-event.service';

describe('UIEventService', () => {
  let uiEventService: UIEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    uiEventService = TestBed.inject(UIEventService);
  });

  it('should be created', () => {
    expect(uiEventService).toBeTruthy();
  });

  it('should be able to emit and receive event', () => {
    const spy = jasmine.createSpy();
    uiEventService.getUiEventPool().subscribe(spy);
    uiEventService.next(UIEventEnum.DISPLAY_AUTH_MODAL);

    expect(spy).toHaveBeenCalledWith(UIEventEnum.DISPLAY_AUTH_MODAL);
  });
});
