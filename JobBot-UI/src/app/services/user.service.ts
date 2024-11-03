import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import User from 'src/models/user.model';
import { UserApiService } from 'src/app/services/server-routes/user-api/user-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User = null;

  constructor(
    private readonly userApi: UserApiService,
    private readonly http: HttpClient
  ) {}

  public registerUser(registerUserRequest: any): Promise<any> {
    return new Promise((resolve, reject) => {
      firstValueFrom(
        this.http.post(this.userApi.getCreateUserURL(), registerUserRequest)
      )
        .then((response) => {
          // TODO: Dev function, to be removed in PROD
          this.saveSession(registerUserRequest.email, registerUserRequest.password);
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
          this.saveSession(authenticateRequest.email, authenticateRequest.password);
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
      this.authenticateUser({email: email, password: password});
    }
  }

  private preserveUser(response: any): void {
    if (this.user == null) {
      this.user = new User();
    }
    this.user.id = response.payload.userId;
    this.fetchUser(this.user.id);
  }

  public fetchUser(userId: number): void {
    firstValueFrom(
      this.http.get(this.userApi.getGetUserURL(userId))
    )
      .then((response) => {
        this.cacheUser(response);
      })
      .catch((error) => { console.error(error) });
  }

  private cacheUser(response: any) {
    this.user.username = response.username;
    this.user.email = response.email;
  }

  public isLoggedIn(): boolean {
    return this.getUser() != null;
  }

  public logout(): void {
    // TODO: Dev function, to be removed in PROD
    this.endSession('currentUserEmail');
    this.endSession('currentUserPassword');
    this.user = null;
  }

  public getUser(): User {
    return this.user;
  }
}
