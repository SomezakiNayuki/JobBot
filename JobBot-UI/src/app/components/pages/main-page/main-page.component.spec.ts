import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageComponent } from 'src/app/components/pages/main-page/main-page.component';
import { UIEventService } from 'src/app/services/ui-event.service';
import { UserService } from 'src/app/services/user.service';
import UIEventEnum from 'src/enums/ui-event.enum';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let uiEventService: UIEventService;

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
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    uiEventService = TestBed.inject(UIEventService);
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
    it('should emit UIEventEnum.DISPLAY_AUTH_MODAL', () => {
      spyOn(uiEventService, 'next');

      component.openAuthModal();

      expect(uiEventService.next).toHaveBeenCalledWith(
        UIEventEnum.DISPLAY_AUTH_MODAL
      );
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
});
