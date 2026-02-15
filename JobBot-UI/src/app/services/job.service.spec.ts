import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Store } from '@ngrx/store';

import { JobApiService } from 'src/app/services/server-routes/job-api/job-api.service';
import { JobService } from 'src/app/services/job.service';
import { UserService } from 'src/app/services/user.service';

describe('JobService', () => {
  let service: JobService;
  let http: jasmine.SpyObj<HttpClient>;
  let jobApi: JobApiService;
  let store: jasmine.SpyObj<Store>;

  beforeEach(() => {
    store = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    store.select.and.returnValue(of({ id: 1 }));

    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: jasmine.createSpyObj('HttpClient', ['post', 'get', 'delete']),
        },
        JobApiService,
        {
          provide: Store,
          useValue: store,
        }
      ],
    });
    service = TestBed.inject(JobService);
    http = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    jobApi = TestBed.inject(JobApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('postJob', () => {
    it('should call getCreateJobURL and post job', async () => {
      spyOn(jobApi, 'getCreateJobURL').and.returnValue('testUrl');
      http.post.and.returnValue(of({}));
      const req = { date: '2024-01-01', time: '12:00', foo: 'bar' };
      await service.postJob(req);
      expect(http.post).toHaveBeenCalledWith('testUrl', {
        foo: 'bar',
        time: '2024-01-01 12:00',
        userId: 1,
      });
      expect(jobApi.getCreateJobURL).toHaveBeenCalled();
    });

    it('should throw error if http.post fails', async () => {
      spyOn(jobApi, 'getCreateJobURL').and.returnValue('testUrl');
      http.post.and.returnValue(throwError(() => new Error('fail')));
      await expectAsync(service.postJob({ date: '2024-01-01', time: '12:00' })).toBeRejected();
    });
  });

  describe('updateJob', () => {
    it('should call getUpdateJobURL and dispatch fetchMyPostedJobs', async () => {
      spyOn(jobApi, 'getUpdateJobURL').and.returnValue('testUrl');
      http.post.and.returnValue(of({}));
      const req = { date: '2024-01-01', time: '12:00', foo: 'bar' };
      await service.updateJob(req);
      expect(http.post).toHaveBeenCalledWith('testUrl', {
        foo: 'bar',
        time: '2024-01-01 12:00',
      });
      expect(jobApi.getUpdateJobURL).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalled();
    });

    it('should reject if http.post fails', async () => {
      spyOn(jobApi, 'getUpdateJobURL').and.returnValue('testUrl');
      http.post.and.returnValue(throwError(() => new Error('fail')));
      await expectAsync(service.updateJob({ date: '2024-01-01', time: '12:00' })).toBeRejected();
    });
  });

  describe('getJobs', () => {
    it('should call getGetJobsURL and map jobs', async () => {
      spyOn(jobApi, 'getGetJobsURL').and.returnValue('testUrl');
      http.get.and.returnValue(of([{ id: 1, time: '2024-01-01 12:00' }]));
      const jobs = await service.getJobs();
      expect(http.get).toHaveBeenCalledWith('testUrl');
      expect(jobApi.getGetJobsURL).toHaveBeenCalled();
      expect(jobs.length).toBe(1);
      expect(jobs[0].id).toBe(1);
    });

    it('should reject if http.get fails', async () => {
      spyOn(jobApi, 'getGetJobsURL').and.returnValue('testUrl');
      http.get.and.returnValue(throwError(() => new Error('fail')));
      await expectAsync(service.getJobs()).toBeRejected();
    });
  });

  describe('deleteJob', () => {
    it('should call getDeleteJobURL and dispatch fetchMyPostedJobs', async () => {
      spyOn(jobApi, 'getDeleteJobURL').and.returnValue('testUrl');
      http.delete.and.returnValue(of({}));
      await service.deleteJob(1);
      expect(http.delete).toHaveBeenCalledWith('testUrl');
      expect(jobApi.getDeleteJobURL).toHaveBeenCalledWith(1);
      expect(store.dispatch).toHaveBeenCalled();
    });

    it('should reject if http.delete fails', async () => {
      spyOn(jobApi, 'getDeleteJobURL').and.returnValue('testUrl');
      http.delete.and.returnValue(throwError(() => new Error('fail')));
      await expectAsync(service.deleteJob(1)).toBeRejected();
    });
  });

  describe('getPostedJobsByUserId', () => {
    it('should call getGetPostedJobsByUserIdURL and map jobs', async () => {
      spyOn(jobApi, 'getGetPostedJobsByUserIdURL').and.returnValue('testUrl');
      http.get.and.returnValue(of([{ id: 2, time: '2024-01-01 12:00' }]));
      const jobs = await service.getPostedJobsByUserId(2);
      expect(http.get).toHaveBeenCalledWith('testUrl');
      expect(jobApi.getGetPostedJobsByUserIdURL).toHaveBeenCalledWith(2);
      expect(jobs.length).toBe(1);
      expect(jobs[0].id).toBe(2);
    });

    it('should reject if http.get fails', async () => {
      spyOn(jobApi, 'getGetPostedJobsByUserIdURL').and.returnValue('testUrl');
      http.get.and.returnValue(throwError(() => new Error('fail')));
      await expectAsync(service.getPostedJobsByUserId(2)).toBeRejected();
    });
  });

  describe('uploadImage', () => {
    it('should call getUploadImageURL and post FormData', async () => {
      spyOn(jobApi, 'getUploadImageURL').and.returnValue('testUrl');
      http.post.and.returnValue(of({}));
      const file = new File([''], 'filename');
      await service.uploadImage(1, file);
      expect(http.post).toHaveBeenCalled();
      expect(jobApi.getUploadImageURL).toHaveBeenCalledWith(1);
    });
  });

  describe('deleteJobImage', () => {
    it('should call getDeleteJobImageURL and delete', async () => {
      spyOn(jobApi, 'getDeleteJobImageURL').and.returnValue('testUrl');
      http.delete.and.returnValue(of({}));
      await service.deleteJobImage(1, 2);
      expect(http.delete).toHaveBeenCalledWith('testUrl');
      expect(jobApi.getDeleteJobImageURL).toHaveBeenCalledWith(1, 2);
    });
  });

  describe('getJobImages', () => {
    it('should call getGetJobImageURL and get', async () => {
      spyOn(jobApi, 'getGetJobImageURL').and.returnValue('testUrl');
      http.get.and.returnValue(of([]));
      await service.getJobImages(1);
      expect(http.get).toHaveBeenCalledWith('testUrl');
      expect(jobApi.getGetJobImageURL).toHaveBeenCalledWith(1);
    });
  });

  describe('fromRestJobsToJobs', () => {
    it('should convert jobs array', () => {
      const jobs = [{ id: 1, time: '2024-01-01 12:00' }];
      const result = (service as any).fromRestJobsToJobs(jobs);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(1);
      expect(result[0].time).toBeDefined();
    });
  });
});