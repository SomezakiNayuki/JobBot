import { createAction, props } from '@ngrx/store';

import Job from 'src/models/job.model';

const fetchJob = createAction('[job][fetch]');

const fetchJobSuccess = createAction(
  '[job][fetch][success]',
  props<{ jobs: Job[] }>()
);

export const JobActions = {
  fetchJob,
  fetchJobSuccess,
};
