import { TestBed } from '@angular/core/testing';

import { JobApiService } from 'src/app/services/server-routes/job-api/job-api.service';

describe('JobApiService', () => {
  let service: JobApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
