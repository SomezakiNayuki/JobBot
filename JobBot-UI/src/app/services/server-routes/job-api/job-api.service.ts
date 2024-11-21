import { Injectable } from '@angular/core';

import { BaseServerRoutesService } from 'src/app/services/server-routes/base-server-routes.service';

@Injectable({
  providedIn: 'root',
})
export class JobApiService extends BaseServerRoutesService {
  private readonly BASE_URL: string = '/api/job';

  constructor() {
    super();
  }

  public getCreateJobURL(): string {
    return this.getBaseServerURL() + this.BASE_URL + '/create';
  }

  public getGetJobURL(): string {
    return this.getBaseServerURL() + this.BASE_URL + '/get';
  }

  public getGetJobDetailURL(id: number): string {
    return this.getBaseServerURL() + this.BASE_URL + '/get/' + id;
  }
}
