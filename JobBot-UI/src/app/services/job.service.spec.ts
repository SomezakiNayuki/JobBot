import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { JobService } from 'src/app/services/job.service';
import { JobApiService } from 'src/app/services/server-routes/job-api/job-api.service';
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
          },
        },
        {
          provide: UserService,
          useValue: {
            getUser: jasmine.createSpy().and.returnValue({ id: 1 }),
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
});
