import { createFeatureSelector, createSelector } from '@ngrx/store';

import UserState from 'src/app/store/states/user/user.state';

const userFeature = createFeatureSelector<UserState>('user');

const user = createSelector(userFeature, (state) => state.user);

export const UserSelectors = {
  user,
};
