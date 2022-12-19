/* eslint-disable no-param-reassign */
import produce, { Draft } from 'immer';
import { initialIngredientsState } from 'redux/ducks/admin/supplier/ingredients/constants';
import { LoadingState } from 'redux/types';

import { IngredientsActions, IngredientsActionTypes } from './types/actions';
import { IngredientsState } from './types/state';

export const ingredientsReducer = produce((draftState: Draft<IngredientsState>, action: IngredientsActions) => {
  switch (action.type) {
    case IngredientsActionTypes.FETCH_INGREDIENTS:
      draftState.loadingStatus = LoadingState.LOADING;
      draftState.queryParams = action.payload?.params || {};
      draftState.items = [];
      break;
    case IngredientsActionTypes.SET_INGREDIENTS_LOADING_STATUS:
      draftState.loadingStatus = LoadingState.LOADING;
      break;
    case IngredientsActionTypes.SET_INGREDIENTS_ITEMS:
      draftState.loadingStatus = LoadingState.LOADED;
      draftState.items = action.payload.items;
      draftState.totalCount = action.payload.totalCount;
      break;
    case IngredientsActionTypes.ADD_INGREDIENT_SUCCESS:
      draftState.items.push(action.payload);
      break;
    default:
      break;
  }
}, initialIngredientsState());
