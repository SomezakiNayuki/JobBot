import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { JobApiService } from 'src/app/services/server-routes/job-api/job-api.service';
import { UserService } from 'src/app/services/user.service';
import Job from 'src/models/job.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(
    private readonly jobApi: JobApiService,
    private readonly http: HttpClient,
    private readonly userService: UserService
  ) {}

  public postJob(createJobRequest: any): Promise<any> {
    const { date, time, ...rest } = createJobRequest;

    createJobRequest = {
      ...rest,
      time: `${date} ${time}`,
      userId: this.userService.getUser().id,
    };

    return new Promise((resolve, reject) => {
      firstValueFrom(
        this.http.post(this.jobApi.getCreateJobURL(), createJobRequest)
      )
        .then((response) => {
          return resolve(response);
        })
        .catch((error) => reject(error));
    });
  }

  public getJob(): Promise<Job[]> {
    return new Promise((resolve, reject) => {
      firstValueFrom(this.http.get(this.jobApi.getGetJobURL()))
        .then((response) => {
          return resolve(response as Job[]);
        })
        .catch((error) => reject(error));
    });
  }

  public uploadImage(id: number, picture: File): Promise<any> {
    return new Promise((resolve, reject) => {
      let pictureFilePayload: FormData = new FormData();
      pictureFilePayload.append('file', picture);
      firstValueFrom(this.http.post(this.jobApi.getUploadImageURL(id), pictureFilePayload))
        .then((response) => {
          return resolve(response);
        })
        .catch((error) => reject(error));
    });
  }

  public getJobImages(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      firstValueFrom(this.http.get(this.jobApi.getGetJobImageURL(id)))
        .then((response) => {
          return resolve(response);
        })
        .catch((error) => reject(error));
    });
  }
}
