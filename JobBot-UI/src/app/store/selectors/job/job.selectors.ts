import { createFeatureSelector, createSelector } from '@ngrx/store';

import { JobState } from 'src/app/store/states/job/job.state';

const jobFeature = createFeatureSelector<JobState>('job');

const job = createSelector(jobFeature, (state) => state.jobs);

const myPostedJobs = createSelector(jobFeature, (state) => state.myPostedJobs);

export const JobSelectors = {
  job,
  myPostedJobs,
};
