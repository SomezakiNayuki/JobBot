import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';

import { AuthModalComponent } from 'src/app/components/standalone-components/auth-modal/auth-modal.component';
import { JobCardModalComponent } from 'src/app/components/standalone-components/job-card-modal/job-card-modal.component';
import { JobService } from 'src/app/services/job.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'jb-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  @ViewChild(AuthModalComponent) authModal: AuthModalComponent;
  @ViewChild(JobCardModalComponent) jobCardModal: JobCardModalComponent;

  public isSideBarEnabled: boolean = false;

  protected activePage: string = 'dashboard';

  private $destroy: Subject<void> = new Subject<void>();

  constructor(
    private readonly jobService: JobService,
    private readonly userService: UserService
  ) {}

  public ngOnInit(): void {
    // TODO: Dev function, to be removed in PROD
    // TODO: Design and develop "remember me" in the future with session control
    this.userService.autoLogin();
  }

  public ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  public openSideBar(): void {
    this.isUserLoggedIn$()
      .pipe(takeUntil(this.$destroy))
      .subscribe((isLoggedIn$) => {
        this.isSideBarEnabled = isLoggedIn$;
      });
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

  public isUserLoggedIn$(): Observable<boolean> {
    return this.userService.isLoggedIn$();
  }

  public logout(): void {
    this.collapseSideBar();
    this.userService.logout();
  }

  public getUserName$(): Observable<string> {
    return this.userService.getUser$().pipe(map((user) => user.username));
  }

  public onClickPage(page: string): void {
    this.activePage = page;
  }

  public postJob(): Function {
    return this.jobService.postJob.bind(this.jobService);
  }
}
