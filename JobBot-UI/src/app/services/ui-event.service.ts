import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import UIEventEnum from 'src/enums/ui-event.enum';

/**
 * This service should only handle event that acrosses different component
 */

@Injectable({
  providedIn: 'root',
})
export class UIEventService {
  private uiEventPool$: Subject<{ UIEventEnum: UIEventEnum; config?: {} }> =
    new Subject<{ UIEventEnum: UIEventEnum; config?: {} }>();

  constructor() {}

  public getUiEventPool$(): Observable<{
    UIEventEnum: UIEventEnum;
    config?: {};
  }> {
    return this.uiEventPool$.asObservable();
  }

  public next(uiEvent: UIEventEnum, config?: {}): void {
    this.uiEventPool$.next({ UIEventEnum: uiEvent, config: config });
  }
}
