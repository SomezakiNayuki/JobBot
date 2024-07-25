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
  private uiEventPool: Subject<UIEventEnum> = new Subject<UIEventEnum>();

  constructor() {}

  public getUiEventPool(): Observable<UIEventEnum> {
    return this.uiEventPool.asObservable();
  }

  public next(uiEvent: UIEventEnum): void {
    this.uiEventPool.next(uiEvent);
  }
}
