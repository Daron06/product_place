/* eslint-disable no-param-reassign */
import produce, { castDraft, Draft } from 'immer';
import { HYDRATE } from 'next-redux-wrapper';
import { initialChefsState } from 'redux/ducks/chefs/constants';
import { ChefsAction, ChefsActionTypes } from 'redux/ducks/chefs/types/actions';
import { ImmutableChefsState } from 'redux/ducks/chefs/types/state';
import { LoadingState } from 'redux/types';

export const chefsReducer = produce((draftState: Draft<ImmutableChefsState>, action: ChefsAction) => {
  switch (action.type) {
    case HYDRATE:
      draftState.items = castDraft(action.payload.chefs.items);
      draftState.totalCount = castDraft(action.payload.chefs.totalCount);
      draftState.loadingStatus = LoadingState.LOADED;
      break;

    case ChefsActionTypes.FETCH_CHEFS:
      draftState.loadingStatus = LoadingState.LOADING;
      break;

    case ChefsActionTypes.SET_LOADING_STATUS:
      draftState.loadingStatus = action.payload;
      break;

    case ChefsActionTypes.SET_CHEFS:
      draftState.items = action.payload;
      draftState.loadingStatus = LoadingState.LOADED;
      break;
    case ChefsActionTypes.SET_CHEFS_TYPE:
      delete draftState.queryParams.page;
      draftState.queryParams.types = action.payload;
      break;

    case ChefsActionTypes.SET_CHEFS_SEARCH_QUERY:
      delete draftState.queryParams.page;
      draftState.queryParams.query = action.payload;
      break;

    case ChefsActionTypes.RESET_FILTERS:
      draftState.queryParams = {};
      break;

    case ChefsActionTypes.SET_CHEFS_PAGE_NUMBER:
      draftState.queryParams.page = action.payload;
      break;

    case ChefsActionTypes.SET_CHEFS_FILTERS:
      draftState.queryParams = action.payload;
      break;

    case ChefsActionTypes.SET_CHEFS_TOTAL_COUNT:
      draftState.totalCount = action.payload;
      break;

    case ChefsActionTypes.REMOVE_CHEFS_FILTERS:
      action.payload.forEach((key) => {
        delete draftState.queryParams[key];
      });
      break;
    default:
      break;
  }
}, initialChefsState());
