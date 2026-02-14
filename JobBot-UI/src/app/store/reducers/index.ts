import { ActionReducerMap } from '@ngrx/store';

import { AppState } from 'src/app/store/states/app.state';
import { JobReducer } from 'src/app/store/reducers/job/job.reducer';
import { UserReducer } from 'src/app/store/reducers/user/user.reducer';

export const reducers: ActionReducerMap<AppState> = {
  jobs: JobReducer,
  user: UserReducer,
};
