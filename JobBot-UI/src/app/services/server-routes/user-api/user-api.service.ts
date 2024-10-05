import { Injectable } from '@angular/core';

import { BaseServerRoutesService } from 'src/app/services/server-routes/base-server-routes.service';

@Injectable({
  providedIn: 'root',
})
export class UserApiService extends BaseServerRoutesService {
  private readonly BASE_URL: string = '/api/user';

  constructor() {
    super();
  }

  public getCreateUserURL(): string {
    return this.getBaseServerURL() + this.BASE_URL + '/create';
  }

  public getAuthenticateUserURL(): string {
    return this.getBaseServerURL() + this.BASE_URL + '/authenticate';
  }
}
