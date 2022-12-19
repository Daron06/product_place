/* eslint-disable no-param-reassign */

import produce, { Draft } from 'immer';

import { LoadingState } from '../../types';
import { initialUserState } from './constants';
import { UserAction, UserActionTypes } from './types/actions';
import { ImmutableUserState, User } from './types/state';

export const userReducer = produce((draftState: Draft<ImmutableUserState>, action: UserAction) => {
  switch (action.type) {
    case UserActionTypes.SET_USER_DATA:
      draftState.data = (action.payload as User) || null;
      draftState.status = LoadingState.LOADED;
      break;

    case UserActionTypes.SET_AUTH_ERROR_MESSAGE:
      draftState.authErrorMessage = action.payload;
      break;

    case UserActionTypes.SIGN_OUT:
      draftState.data = null;
      draftState.status = LoadingState.LOADED;
      break;

    case UserActionTypes.SET_STATUS:
      draftState.status = action.payload;
      break;

    case UserActionTypes.SET_ERRORS:
      draftState.errors = action.payload;
      if (typeof action.payload === 'undefined') {
        draftState.status = LoadingState.NEVER;
      }
      break;

    default:
      break;
  }
}, initialUserState);
