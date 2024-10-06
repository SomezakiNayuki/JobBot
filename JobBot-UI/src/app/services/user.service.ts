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
          this.preserveUser(response);
          return resolve(response);
        })
        .catch((error) => reject(error));
    });
  }

  private preserveUser(response: any): void {
    if (this.user == null) {
      this.user = new User();
    }
    this.user.id = response.payload.userId;
  }

  public isLoggedIn(): boolean {
    return this.user != null;
  }

  public logout(): void {
    this.user = null;
  }

  public getUser(): User {
    return this.user;
  }
}
