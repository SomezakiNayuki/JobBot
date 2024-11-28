import Job from 'src/models/job.model';

export interface JobState {
  jobs: {
    left: Job[],
    right: Job[],
  },
};
