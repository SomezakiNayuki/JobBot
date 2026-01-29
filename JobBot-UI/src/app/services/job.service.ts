import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { JobApiService } from 'src/app/services/server-routes/job-api/job-api.service';
import { UserService } from 'src/app/services/user.service';
import Job from 'src/models/job.model';
import { JobActions } from '../store/actions/job/job.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(
    private readonly jobApi: JobApiService,
    private readonly http: HttpClient,
    private readonly store: Store,
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

  public updateJob(updateJobRequest: any): Promise<any> {
    const { date, time, ...rest } = updateJobRequest;

    updateJobRequest = {
      ...rest,
      time: `${date} ${time}`,
    };

    return new Promise((resolve, reject) => {
      firstValueFrom(
        this.http.post(this.jobApi.getUpdateJobURL(), updateJobRequest)
      ).then((response) => {
          this.store.dispatch(JobActions.fetchMyPostedJobs({ userId: this.userService.getUser().id }));
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

  public deleteJob(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      firstValueFrom(this.http.delete(this.jobApi.getDeleteJobURL(id)))
        .then((response) => {
          this.store.dispatch(JobActions.fetchMyPostedJobs({ userId: this.userService.getUser().id }));
          return resolve(response);
        })
        .catch((error) => reject(error));
    });
  }

  public getPostedJobsByUserId(userId: number): Promise<Job[]> {
    return new Promise((resolve, reject) => {
      firstValueFrom(this.http.get(this.jobApi.getGetPostedJobsByUserIdURL(userId)))
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
      firstValueFrom(
        this.http.post(this.jobApi.getUploadImageURL(id), pictureFilePayload)
      ).then((response) => {
          return resolve(response);
        })
        .catch((error) => reject(error));
    });
  }

  public deleteJobImage(jobId: number, imageId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      firstValueFrom(
        this.http.delete(this.jobApi.getDeleteJobImageURL(jobId, imageId))
      ).then((response) => {
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
