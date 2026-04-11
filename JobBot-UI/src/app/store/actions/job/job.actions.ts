import { createAction, props } from '@ngrx/store';
import DashboardJobs from 'src/common-types/dashboard-jobs.type';

import Job from 'src/models/job.model';

const fetchJobs = createAction('[job][fetch]');

const fetchJobsSuccess = createAction(
  '[job][fetch][success]',
  props<{ jobs: DashboardJobs }>()
);

const fetchMyPostedJobs = createAction(
  '[job][fetchMyPostedJobs]',
  props<{ userId: number }>()
);

const fetchMyPostedJobsSuccess = createAction(
  '[job][fetchMyPostedJobs][success]',
  props<{ myPostedJobs: Job[] }>()
);

const fetchMyCurrentJobs = createAction(
  '[job][fetchMyCurrentJobs]',
  props<{ userId: number }>()
);

const fetchMyCurrentJobsSuccess = createAction(
  '[job][fetchMyCurrentJobs][success]',
  props<{ myCurrentJobs: Job[] }>()
);

export const JobActions = {
  fetchJobs,
  fetchJobsSuccess,
  fetchMyPostedJobs,
  fetchMyPostedJobsSuccess,
  fetchMyCurrentJobs,
  fetchMyCurrentJobsSuccess,
};
