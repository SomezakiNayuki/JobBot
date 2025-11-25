import { Component, OnInit, ViewChild } from '@angular/core';

import { AuthModalComponent } from 'src/app/components/standalone-components/auth-modal/auth-modal.component';
import { JobCardModalComponent } from 'src/app/components/standalone-components/job-card-modal/job-card-modal.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'jb-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  @ViewChild(AuthModalComponent) authModal: AuthModalComponent;
  @ViewChild(JobCardModalComponent) jobCardModal: JobCardModalComponent;

  public isSideBarEnabled: boolean = false;

  protected activePage: string = 'dashboard';

  constructor(private readonly userService: UserService) {}

  public ngOnInit(): void {
    // TODO: Dev function, to be removed in PROD
    // TODO: Design and develop "remember me" in the future with session control
    this.userService.autoLogin();
  }

  public openSideBar(): void {
    this.isSideBarEnabled = this.isUserLoggedIn();
  }

  public collapseSideBar(): void {
    this.isSideBarEnabled = false;
  }

  public openAuthModal(): void {
    this.authModal.show();
  }

  public openCreateJobModal(): void {
    this.jobCardModal.show();
  }

  public isUserLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  public logout(): void {
    this.collapseSideBar();
    this.userService.logout();
  }

  public getUserName(): string {
    return this.userService.getUser()?.username;
  }

  public onClickPage(page: string): void {
    this.activePage = page;
  }
}
