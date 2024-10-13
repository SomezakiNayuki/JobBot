import { Component, OnInit } from '@angular/core';

import UIEventEnum from 'src/enums/ui-event.enum';
import { UIEventService } from 'src/app/services/ui-event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'jb-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  protected isSideBarEnabled: boolean = false;

  constructor(
    private readonly uiEvent: UIEventService,
    private readonly userService: UserService,
  ) {}

  public ngOnInit(): void {}

  protected openSideBar(): void {
    this.isSideBarEnabled = this.isUserLoggedIn();
  }

  protected collapseSideBar(): void {
    this.isSideBarEnabled = false;
  }

  protected openAuthModal(): void {
    this.uiEvent.next(UIEventEnum.DISPLAY_AUTH_MODAL);
  }

  protected isUserLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  protected logout(): void {
    this.collapseSideBar();
    this.userService.logout();
  }
}
