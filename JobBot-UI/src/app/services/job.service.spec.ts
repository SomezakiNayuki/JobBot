import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { JobApiService } from 'src/app/services/server-routes/job-api/job-api.service';
import { JobService } from 'src/app/services/job.service';
import { UserService } from './user.service';

describe('JobService', () => {
  let service: JobService;
  let http: jasmine.SpyObj<HttpClient>;
  let jobApi: JobApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: {
            post: jasmine.createSpy().and.returnValue({
              subscribe: jasmine.createSpy(),
            }),
            get: jasmine.createSpy().and.returnValue({
              subscribe: jasmine.createSpy(),
            }),
          },
        },
        {
          provide: UserService,
          useValue: {
            getUser$: jasmine.createSpy().and.returnValue({ id: 1 }),
          },
        },
        JobApiService,
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
    it('should call getCreateJobURL', () => {
      spyOn(jobApi, 'getCreateJobURL').and.returnValue('testUrl');

      service.postJob({});

      expect(http.post).toHaveBeenCalledWith('testUrl', {
        time: 'undefined undefined',
        userId: 1,
      });
      expect(jobApi.getCreateJobURL).toHaveBeenCalled();
    });
  });

  describe('getJob', () => {
    it('should call getGetJobURL', () => {
      spyOn(jobApi, 'getGetJobURL').and.returnValue('testUrl');

      service.getJob();

      expect(http.get).toHaveBeenCalledWith('testUrl');
      expect(jobApi.getGetJobURL).toHaveBeenCalled();
    });
  });

  describe('uploadImage', () => {
    it('should call getUploadImageURL', () => {
      spyOn(jobApi, 'getUploadImageURL').and.returnValue('testUrl');

      service.uploadImage(1, {} as File);

      expect(http.post).toHaveBeenCalledWith('testUrl', new FormData());
      expect(jobApi.getUploadImageURL).toHaveBeenCalledWith(1);
    });
  });

  describe('getJobImages', () => {
    it('should call getGetJobImageURL', () => {
      spyOn(jobApi, 'getGetJobImageURL').and.returnValue('testUrl');

      service.getJobImages(1);

      expect(http.get).toHaveBeenCalledWith('testUrl');
      expect(jobApi.getGetJobImageURL).toHaveBeenCalledWith(1);
    });
  });
});
