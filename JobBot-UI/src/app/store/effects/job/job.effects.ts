import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, from } from 'rxjs';

import Job from 'src/models/job.model';
import { JobActions } from 'src/app/store/actions/job/job.actions';
import { JobService } from 'src/app/services/job.service';

@Injectable()
export class JobEffects {
  fetchJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobActions.fetchJob),
      mergeMap(() =>
        from(this.jobService.getJob()).pipe(
          map(jobs => JobActions.fetchJobSuccess({ jobs: { left: jobs.filter((_, index) => index % 2 === 0), right: jobs.filter((_, index) => index % 2 !== 0), }, })),
        ),
      ),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly jobService: JobService,
  ) {}
}
