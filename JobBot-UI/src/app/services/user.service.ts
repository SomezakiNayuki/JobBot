import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, firstValueFrom, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import User from 'src/models/user.model';
import { UserApiService } from 'src/app/services/server-routes/user-api/user-api.service';
import { UserActions } from 'src/app/store/actions/user/user.action';
import { UserSelectors } from 'src/app/store/selectors/user/user.selectors';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private readonly http: HttpClient,
    private readonly store: Store,
    private readonly userApi: UserApiService
  ) {}

  public registerUser(registerUserRequest: any): Promise<any> {
    return new Promise((resolve, reject) => {
      firstValueFrom(
        this.http.post(this.userApi.getCreateUserURL(), registerUserRequest)
      )
        .then((response) => {
          // TODO: Dev function, to be removed in PROD
          this.saveSession(
            registerUserRequest.email,
            registerUserRequest.password
          );
          this.preserveUser(response);
          return resolve(response);
        })
        .catch((error) => reject(error));
    });
  }

  public authenticateUser(authenticateRequest: any): Promise<any> {
    return new Promise((resolve, reject) => {
      firstValueFrom(
        this.http.post(
          this.userApi.getAuthenticateUserURL(),
          authenticateRequest
        )
      )
        .then((response) => {
          // TODO: Dev function, to be removed in PROD
          this.saveSession(
            authenticateRequest.email,
            authenticateRequest.password
          );
          this.preserveUser(response);
          return resolve(response);
        })
        .catch((error) => reject(error));
    });
  }

  // TODO: Dev function, to be removed in PROD
  private saveSession(email: string, password: string): void {
    sessionStorage.setItem('currentUserEmail', email);
    sessionStorage.setItem('currentUserPassword', password);
  }

  // TODO: Dev function, to be removed in PROD
  private endSession(key: string): void {
    sessionStorage.removeItem(key);
  }

  // TODO: Dev function, to be removed in PROD
  public autoLogin(): void {
    const email: string = sessionStorage.getItem('currentUserEmail');
    const password: string = sessionStorage.getItem('currentUserPassword');
    if (email && password) {
      this.authenticateUser({ email: email, password: password });
    }
  }

  private preserveUser(response: any): void {
    this.fetchUser(response.payload.userId);
  }

  public fetchUser(userId: number): void {
    firstValueFrom(this.http.get(this.userApi.getGetUserURL(userId)))
      .then((response) => {
        this.store.dispatch(
          UserActions.preserveUser({ user: response as User })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  public isLoggedIn$(): Observable<boolean> {
    return this.getUser$().pipe(map((user) => !!user));
  }

  public logout(): void {
    // TODO: Dev function, to be removed in PROD
    this.endSession('currentUserEmail');
    this.endSession('currentUserPassword');
    this.store.dispatch(UserActions.clearUser());
  }

  public getUser$(): Observable<User> {
    return this.store.select(UserSelectors.user).pipe(filter(Boolean));
  }
}
