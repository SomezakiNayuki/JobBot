import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import User from 'src/models/user.model';
import { UserActions } from 'src/app/store/actions/user/user.action';
import { UserApiService } from 'src/app/services/server-routes/user-api/user-api.service';
import { UserService } from 'src/app/services/user.service';

describe('UserService', () => {
  let service: UserService;
  let http: jasmine.SpyObj<HttpClient>;
  let store: jasmine.SpyObj<Store>;
  let userApi: UserApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: {
            post: jasmine.createSpy().and.returnValue({
              subscribe: jasmine.createSpy(),
            }),
          },
        },
        UserApiService,
        {
          provide: Store,
          useValue: {
            dispatch: jasmine.createSpy(),
          },
        }
      ],
    });
    service = TestBed.inject(UserService);

    http = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    userApi = TestBed.inject(UserApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('registerUser', () => {
    it('should call getCreateUserURL', () => {
      spyOn(userApi, 'getCreateUserURL').and.returnValue('testUrl');

      service.registerUser({});

      expect(http.post).toHaveBeenCalledWith('testUrl', {});
      expect(userApi.getCreateUserURL).toHaveBeenCalled();
    });
  });

  describe('authenticateUser', () => {
    it('should call getAuthenticateUserURL', () => {
      spyOn(userApi, 'getAuthenticateUserURL').and.returnValue('testUrl');

      service.authenticateUser({});

      expect(http.post).toHaveBeenCalledWith('testUrl', {});
      expect(userApi.getAuthenticateUserURL).toHaveBeenCalled();
    });
  });

  describe('isLoggedIn$', () => {
    it('should check if user is null', () => {
      const spy = jasmine.createSpy();
      spyOn(service, 'getUser$').and.returnValue(of(null));

      service.isLoggedIn$().subscribe(spy);

      expect(spy).toHaveBeenCalledWith(false);

      (service.getUser$ as jasmine.Spy).and.returnValue(of(new User()));

      service.isLoggedIn$().subscribe(spy);
      expect(spy).toHaveBeenCalledWith(true);
    });
  });

  describe('logout', () => {
    it('should set user to null', () => {
      service.logout();

      expect(store.dispatch).toHaveBeenCalledWith(UserActions.clearUser());
    });
  });

  describe('getUser$', () => {
    it('should return user', () => {
      const spy = jasmine.createSpy();
      store.select = jasmine.createSpy().and.returnValue(of({ username: 'test' }));

      service.getUser$().subscribe(spy);
      expect(spy).toHaveBeenCalledWith({ username: 'test' });
    });
  });
});
