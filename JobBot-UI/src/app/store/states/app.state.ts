import { JobState } from 'src/app/store/states/job/job.state';
import UserState from 'src/app/store/states/user/user.state';

export interface AppState {
  jobs: JobState;
  user: UserState;
}
