import { createReducer, on } from '@ngrx/store';

import { JobActions } from 'src/app/store/actions/job/job.actions';
import { JobState } from 'src/app/store/states/job/job.state';

const initialState: JobState = {
  jobs: {
    left: [],
    right: [],
  },
  myPostedJobs: [],
};

export const JobReducer = createReducer(
  initialState,
  on(JobActions.fetchJob, (state) => ({ ...state })),
  on(JobActions.fetchJobSuccess, (state, { jobs }) => ({
    ...state,
    jobs: {
      left: jobs.left,
      right: jobs.right,
    },
  })),
  on(JobActions.fetchMyPostedJobs, (state) => ({ ...state })),
  on(JobActions.fetchMyPostedJobsSuccess, (state, { myPostedJobs }) => ({
    ...state,
    myPostedJobs: myPostedJobs,
  })),
);
