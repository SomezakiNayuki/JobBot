import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';

import { AuthModalComponent } from 'src/app/components/standalone-components/auth-modal/auth-modal.component';
import { JobCardModalComponent } from 'src/app/components/standalone-components/job-card-modal/job-card-modal.component';
import { MainPageComponent } from 'src/app/components/pages/main-page/main-page.component';
import User from 'src/models/user.model';
import { UserService } from 'src/app/services/user.service';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let authModal: AuthModalComponent;
  let jobCardModal: JobCardModalComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainPageComponent],
      providers: [
        {
          provide: HttpClient,
          useValue: {},
        },
        {
          provide: UserService,
          useValue: {
            isLoggedIn: jasmine.createSpy(),
            logout: jasmine.createSpy(),
            getUser: jasmine.createSpy(),
            autoLogin: jasmine.createSpy(),
          },
        },
        {
          provide: Store,
          useValue: MockStore,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authModal = TestBed.createComponent(AuthModalComponent).componentInstance;
    component.authModal = authModal;
    jobCardModal = TestBed.createComponent(
      JobCardModalComponent
    ).componentInstance;
    component.jobCardModal = jobCardModal;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('openSideBar', () => {
    it('should open side bar based on login status', () => {
      userService.isLoggedIn.and.returnValue(true);

      component.openSideBar();

      expect(component.isSideBarEnabled).toBeTruthy();

      userService.isLoggedIn.and.returnValue(false);

      component.openSideBar();

      expect(component.isSideBarEnabled).toBeFalsy();
    });
  });

  describe('collapseSideBar', () => {
    it('should close side bar', () => {
      component.isSideBarEnabled = true;

      component.collapseSideBar();

      expect(component.isSideBarEnabled).toBeFalsy();
    });
  });

  describe('openAuthModal', () => {
    it('should call authModal show()', () => {
      spyOn(authModal, 'show');

      component.openAuthModal();

      expect(component.authModal.show).toHaveBeenCalledWith();
    });
  });

  describe('openCreateJobModal', () => {
    it('should call jobCardModal show()', () => {
      spyOn(jobCardModal, 'show');

      component.openCreateJobModal();

      expect(component.jobCardModal.show).toHaveBeenCalledWith();
    });
  });

  describe('isUserLoggedIn', () => {
    it('should check if user is logged in', () => {
      userService.isLoggedIn.and.returnValue(true);

      expect(component.isUserLoggedIn()).toBeTruthy();

      userService.isLoggedIn.and.returnValue(false);

      expect(component.isUserLoggedIn()).toBeFalsy();
    });
  });

  describe('logout', () => {
    it('should collapse side bar and call userService to logout', () => {
      component.logout();

      expect(component.isSideBarEnabled).toBeFalsy();
      expect(userService.logout).toHaveBeenCalled();
    });
  });

  describe('getUserName', () => {
    it('should return username', () => {
      let user: User = new User();
      user.username = 'test username';
      userService.getUser.and.returnValue(user);

      expect(component.getUserName()).toEqual('test username');
    });
  });

  describe('onClickPage', () => {
    it('should set current page to clicked page', () => {
      expect(component['activePage']).toEqual('dashboard');

      component.onClickPage('my-posted-jobs');

      expect(component['activePage']).toEqual('my-posted-jobs');
    });
  });
});
