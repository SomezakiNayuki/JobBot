import { createFeatureSelector, createSelector } from '@ngrx/store';

import { JobState } from 'src/app/store/states/job/job.state';

const jobFeature = createFeatureSelector<JobState>('jobs');

const jobs = createSelector(jobFeature, (state) => state.jobs);

const myPostedJobs = createSelector(jobFeature, (state) => state.myPostedJobs);

const myCurrentJobs = createSelector(jobFeature, (state) => state.myCurrentJobs);

export const JobSelectors = {
  jobs,
  myPostedJobs,
  myCurrentJobs,
};
