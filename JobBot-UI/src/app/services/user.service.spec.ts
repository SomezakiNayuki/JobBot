import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { UserService } from 'src/app/services/user.service';
import User from 'src/models/user.model';
import { UserApiService } from './server-routes/user-api/user-api.service';

describe('UserService', () => {
  let service: UserService;
  let http: jasmine.SpyObj<HttpClient>;
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
      ],
    });
    service = TestBed.inject(UserService);

    http = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
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

  describe('isLoggedIn', () => {
    it('should check if user is null', () => {
      spyOn(service, 'getUser').and.returnValue(null);

      expect(service.isLoggedIn()).toBeFalsy();

      (service.getUser as jasmine.Spy).and.returnValue(new User());

      expect(service.isLoggedIn()).toBeTruthy();
    });
  });

  describe('logout', () => {
    it('should set user to null', () => {
      service['user'] = new User();

      service.logout();

      expect(service['user']).toBe(null);
    });
  });

  describe('getUser', () => {
    it('should return user', () => {
      const user: User = new User();
      user.username = 'test';
      service['user'] = user;

      expect(service.getUser().username).toBe(user.username);
    });
  });
});
