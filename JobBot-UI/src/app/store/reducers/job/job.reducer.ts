import { createReducer, on } from '@ngrx/store';

import { JobActions } from 'src/app/store/actions/job/job.actions';
import { JobState } from 'src/app/store/states/job/job.state';
import DashboardJobs from 'src/common-types/dashboard-jobs.type';

const initialState: JobState = {
  jobs: new DashboardJobs(),
  myPostedJobs: [],
};

export const JobReducer = createReducer(
  initialState,
  on(JobActions.fetchJobs, (state) => ({ ...state })),
  on(JobActions.fetchJobsSuccess, (state, { jobs }) => ({
    ...state,
    jobs: {
      leftColumn: jobs.leftColumn,
      rightColumn: jobs.rightColumn,
    },
  })),
  on(JobActions.fetchMyPostedJobs, (state) => ({ ...state })),
  on(JobActions.fetchMyPostedJobsSuccess, (state, { myPostedJobs }) => ({
    ...state,
    myPostedJobs: myPostedJobs,
  }))
);
