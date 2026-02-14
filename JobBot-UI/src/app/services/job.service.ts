import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, firstValueFrom, take } from 'rxjs';

import { JobApiService } from 'src/app/services/server-routes/job-api/job-api.service';
import Job from 'src/models/job.model';
import { JobActions } from '../store/actions/job/job.actions';
import { Store } from '@ngrx/store';
import Time from 'src/models/time.model';
import { UserSelectors } from 'src/app/store/selectors/user/user.selectors';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(
    private readonly jobApi: JobApiService,
    private readonly http: HttpClient,
    private readonly store: Store
  ) {}

  public async postJob(createJobRequest: any): Promise<any> {
    const { date, time, ...rest } = createJobRequest;

    const user = await firstValueFrom(
      this.store.select(UserSelectors.user).pipe(filter(Boolean), take(1))
    );

    createJobRequest = {
      ...rest,
      time: `${date} ${time}`,
      userId: user.id,
    };

    return firstValueFrom(
      this.http.post(this.jobApi.getCreateJobURL(), createJobRequest)
    );
  }

  public async updateJob(updateJobRequest: any): Promise<any> {
    const { date, time, ...rest } = updateJobRequest;

    const user = await firstValueFrom(
      this.store.select(UserSelectors.user).pipe(filter(Boolean), take(1))
    );

    updateJobRequest = {
      ...rest,
      time: `${date} ${time}`,
    };

    return new Promise((resolve, reject) => {
      firstValueFrom(
        this.http.post(this.jobApi.getUpdateJobURL(), updateJobRequest)
      )
        .then((response) => {
          this.store.dispatch(
            JobActions.fetchMyPostedJobs({ userId: user.id })
          );
          return resolve(response);
        })
        .catch((error) => reject(error));
    });
  }

  public getJobs(): Promise<Job[]> {
    return new Promise((resolve, reject) => {
      firstValueFrom(this.http.get(this.jobApi.getGetJobsURL()))
        .then((response) => {
          return resolve(this.fromRestJobsToJobs(response as any[]));
        })
        .catch((error) => reject(error));
    });
  }

  public async deleteJob(id: number): Promise<any> {
    const user = await firstValueFrom(
      this.store.select(UserSelectors.user).pipe(filter(Boolean), take(1))
    );

    return new Promise((resolve, reject) => {
      firstValueFrom(this.http.delete(this.jobApi.getDeleteJobURL(id)))
        .then((response) => {
          this.store.dispatch(
            JobActions.fetchMyPostedJobs({ userId: user.id })
          );
          return resolve(response);
        })
        .catch((error) => reject(error));
    });
  }

  public getPostedJobsByUserId(userId: number): Promise<Job[]> {
    return new Promise((resolve, reject) => {
      firstValueFrom(
        this.http.get(this.jobApi.getGetPostedJobsByUserIdURL(userId))
      )
        .then((response) => {
          return resolve(this.fromRestJobsToJobs(response as any[]));
        })
        .catch((error) => reject(error));
    });
  }

  public uploadImage(id: number, image: File): Promise<any> {
    let imageFilePayload: FormData = new FormData();
    imageFilePayload.append('file', image);

    return firstValueFrom(
      this.http.post(this.jobApi.getUploadImageURL(id), imageFilePayload)
    );
  }

  public deleteJobImage(jobId: number, imageId: number): Promise<any> {
    return firstValueFrom(
      this.http.delete(this.jobApi.getDeleteJobImageURL(jobId, imageId))
    );
  }

  public getJobImages(id: number): Promise<any> {
    return firstValueFrom(this.http.get(this.jobApi.getGetJobImageURL(id)));
  }

  private fromRestJobsToJobs(jobs: any[]): Job[] {
    let jobObjects: Job[] = [];
    for (let job of jobs) {
      jobObjects.push({
        ...job,
        time: new Time(job.time),
      });
    }
    return jobObjects;
  }
}
