/* eslint-disable no-param-reassign */
import produce, { castDraft, Draft } from 'immer';

import { StatusEnum } from '../../../../services/types';
import { LoadingState } from '../../../types';
import { initialProductState } from './constants';
import { AdminProductsActions, AdminProductsActionsTypes } from './types/actions';
import { AdminProductsState } from './types/state';

export const adminProductsReducer = produce((draftState: Draft<AdminProductsState>, action: AdminProductsActions) => {
  switch (action.type) {
    case AdminProductsActionsTypes.SET_LOADING:
      draftState.loadingStatus = action.payload;
      break;

    case AdminProductsActionsTypes.SET_ITEMS:
      if (action.payload) {
        draftState.loadingStatus = LoadingState.LOADED;
        draftState.items = castDraft(action.payload?.items || []);
        draftState.totalCount = action.payload.totalCount;
      }
      break;

    case AdminProductsActionsTypes.FETCH_ITEMS:
      draftState.endpoint = action.payload.endpoint;
      draftState.queryParams = action.payload.params || {};
      draftState.items = [];
      draftState.loadingStatus = LoadingState.LOADING;
      break;

    case AdminProductsActionsTypes.SET_PRODUCTS_ENDPOINT:
      draftState.endpoint = action.payload;
      break;

    case AdminProductsActionsTypes.RESET:
      draftState = castDraft(initialProductState());
      break;

    case AdminProductsActionsTypes.CHANGE_PAGINATION:
      draftState.loadingStatus = LoadingState.LOADING;
      draftState.queryParams.page = action.payload;
      break;

    case AdminProductsActionsTypes.ACTIVATE_ITEMS: {
      draftState.items = draftState.items?.map((item) => {
        if (action.payload.includes(Number(item.id)) && item.status !== 'pending') {
          item.status = StatusEnum.ACTIVE;
        }
        return item;
      });
      break;
    }

    case AdminProductsActionsTypes.DEACTIVATE_ITEMS: {
      draftState.items = draftState.items?.map((item) => {
        if (action.payload.includes(Number(item.id)) && item.status !== 'pending') {
          item.status = StatusEnum.DISABLED;
        }
        return item;
      });
      break;
    }

    case AdminProductsActionsTypes.DELETE_ITEMS: {
      draftState.items = draftState.items?.filter((item) => !action.payload.includes(Number(item.id)));
      break;
    }

    case AdminProductsActionsTypes.IMPORT_PRODUCT_TO_STORE: {
      draftState.importedProducts.push(action.payload);
      break;
    }

    default:
      break;
  }
}, initialProductState());
