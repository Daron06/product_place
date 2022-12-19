/* eslint-disable no-param-reassign */

import produce, { castDraft, Draft } from 'immer';
import { HYDRATE } from 'next-redux-wrapper';

import { LoadingState } from '../../types';
import { initialDirectoriesState } from './constants';
import { DirectoriesAction, DirectoriesActionTypes } from './types/actions';
import { ImmutableDirectoriesState } from './types/state';

export const directoriesReducer = produce((draftState: Draft<ImmutableDirectoriesState>, action: DirectoriesAction) => {
  switch (action.type) {
    case HYDRATE:
      draftState.data = castDraft(action.payload.directories.data);
      break;

    case DirectoriesActionTypes.SET_DIRECTORIES:
      draftState.data = {
        ...draftState.data,
        ...action.payload,
      };
      draftState.status = LoadingState.LOADED;
      break;

    default:
      break;
  }
}, initialDirectoriesState);
