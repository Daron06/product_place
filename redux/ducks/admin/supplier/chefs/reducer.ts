/* eslint-disable no-param-reassign */
import produce, { Draft } from 'immer';
import { initialChefsState } from 'redux/ducks/chefs/constants';
import { LoadingState } from 'redux/types';

import { StatusEnum } from '../../../../../services/types';
import { SupplierActionsType, SupplierChefsActions } from './types/actions';
import { SupplierChefsState } from './types/state';

export const supplierChefsReducer = produce((draftState: Draft<SupplierChefsState>, action: SupplierChefsActions) => {
  switch (action.type) {
    case SupplierActionsType.SET_LOADING:
      draftState.loadingStatus = action.payload;
      break;

    case SupplierActionsType.FETCH_SUPPLIER_CHEFS:
      draftState.queryParams = action.payload?.params || {};
      draftState.items = [];
      draftState.loadingStatus = LoadingState.LOADING;
      break;

    case SupplierActionsType.SET_SUPPLIER_CHEFS:
      draftState.loadingStatus = LoadingState.LOADED;
      draftState.items = action.payload.items;
      draftState.totalCount = action.payload.totalCount;
      break;

    case SupplierActionsType.ACTIVATE_ITEMS: {
      draftState.items = draftState.items?.map((item) => {
        if (action.payload.includes(Number(item.id)) && item.status !== 'pending') {
          item.status = StatusEnum.ACTIVE;
        }
        return item;
      });
      break;
    }

    case SupplierActionsType.DEACTIVATE_ITEMS: {
      draftState.items = draftState.items?.map((item) => {
        if (action.payload.includes(Number(item.id)) && item.status !== 'pending') {
          item.status = StatusEnum.BLOCKED;
        }
        return item;
      });
      break;
    }

    case SupplierActionsType.CHANGE_PAGINATION:
      draftState.loadingStatus = LoadingState.LOADING;
      draftState.queryParams.page = action.payload;
      break;

    default:
      break;
  }
}, initialChefsState());
