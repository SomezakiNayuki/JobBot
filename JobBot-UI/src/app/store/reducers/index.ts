import { ActionReducerMap } from '@ngrx/store';

import { JobReducer } from 'src/app/store/reducers/job/job.reducer';
import { AppState } from 'src/app/store/states/app.state';

export const reducers: ActionReducerMap<AppState> = {
  job: JobReducer,
};
