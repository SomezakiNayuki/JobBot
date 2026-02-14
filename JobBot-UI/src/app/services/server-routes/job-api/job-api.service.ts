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

  public getUpdateJobURL(): string {
    return this.getBaseServerURL() + this.BASE_URL + '/update';
  }

  public getGetJobsURL(): string {
    return this.getBaseServerURL() + this.BASE_URL + '/get';
  }

  public getDeleteJobURL(id: number): string {
    return this.getBaseServerURL() + this.BASE_URL + '/delete/' + id;
  }

  public getGetPostedJobsByUserIdURL(userId: number): string {
    return this.getBaseServerURL() + this.BASE_URL + '/get/' + userId;
  }

  public getGetJobDetailURL(id: number): string {
    return this.getBaseServerURL() + this.BASE_URL + '/get/' + id;
  }

  public getUploadImageURL(id: number): string {
    return this.getBaseServerURL() + this.BASE_URL + '/uploadImage/' + id;
  }

  public getDeleteJobImageURL(jobId: number, imageId: number): string {
    return (
      this.getBaseServerURL() +
      this.BASE_URL +
      '/deleteImage/' +
      jobId +
      '/' +
      imageId
    );
  }

  public getGetJobImageURL(id: number): string {
    return this.getBaseServerURL() + this.BASE_URL + '/get/' + id + '/images';
  }
}
