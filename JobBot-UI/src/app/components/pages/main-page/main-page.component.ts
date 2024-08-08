import { Component, OnInit } from '@angular/core';

import UIEventEnum from 'src/enums/ui-event.enum';
import { UIEventService } from 'src/app/services/ui-event.service';

@Component({
  selector: 'jb-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  protected isSideBarEnabled: boolean = false;

  constructor(private readonly uiEvent: UIEventService) {}

  public ngOnInit(): void {}

  protected openSideBar(): void {
    this.isSideBarEnabled = true;
  }

  protected collapseSideBar(): void {
    this.isSideBarEnabled = false;
  }

  protected openAuthModal(): void {
    this.uiEvent.next(UIEventEnum.DISPLAY_AUTH_MODAL);
  }
}
