import { createFeatureSelector, createSelector } from '@ngrx/store';

import { JobState } from 'src/app/store/states/job/job.state';

const jobFeature = createFeatureSelector<JobState>('job');

const job = createSelector(jobFeature, (state) => state.jobs);

export const JobSelectors = {
  job,
};
