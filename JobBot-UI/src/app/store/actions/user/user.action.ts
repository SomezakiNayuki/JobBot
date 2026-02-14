import { createAction, props } from '@ngrx/store';

import User from 'src/models/user.model';

const preserveUser = createAction('[user][preserve]', props<{ user: User }>());

const clearUser = createAction('[user][clear]');

export const UserActions = {
  preserveUser,
  clearUser,
};
