import { createReducer, on } from '@ngrx/store';

import { UserActions } from 'src/app/store/actions/user/user.action';
import UserState from 'src/app/store/states/user/user.state';

const initialState: UserState = {
  user: null,
};

export const UserReducer = createReducer(
  initialState,
  on(UserActions.preserveUser, (state, { user }) => ({ ...state, user: user })),
  on(UserActions.clearUser, (state) => ({ ...state, user: null }))
);
