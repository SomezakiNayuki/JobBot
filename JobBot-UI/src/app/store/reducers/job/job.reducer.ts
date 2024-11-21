import { createReducer, on } from '@ngrx/store';

import { JobActions } from 'src/app/store/actions/job/job.actions';
import { JobState } from 'src/app/store/states/job/job.state';

const initialState: JobState = {
  jobs: [],
};

export const JobReducer = createReducer(
  initialState,
  on(JobActions.fetchJob, (state) => ({ ...state })),
  on(JobActions.fetchJobSuccess, (state, { jobs }) => ({
    ...state,
    jobs,
  }))
);
