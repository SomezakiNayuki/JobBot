import DashboardJobs from 'src/common-types/dashboard-jobs.type';
import Job from 'src/models/job.model';

export interface JobState {
  jobs: DashboardJobs;
  myPostedJobs: Job[];
}
