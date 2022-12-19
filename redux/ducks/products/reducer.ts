/* eslint-disable no-param-reassign */
import produce, { castDraft, Draft } from 'immer';
import { HYDRATE } from 'next-redux-wrapper';
import { initialProductsState } from 'redux/ducks/products/constants';
import { ImmutableProductsState } from 'redux/ducks/products/types/state';
import { LoadingState } from 'redux/types';

import { resetState } from '../../../utils/resetState';
import { ProductsAction, ProductsActionTypes } from './types/actions';

export const productsReducer = produce((draftState: Draft<ImmutableProductsState>, action: ProductsAction) => {
  switch (action.type) {
    case HYDRATE:
      draftState.kind = action.payload.products.kind;
      draftState.items = castDraft(action.payload.products.items);
      draftState.totalCount = action.payload.products.totalCount;
      draftState.takeCount = action.payload.products.takeCount;
      draftState.queryParams = castDraft(action.payload.products.queryParams);
      draftState.error = action.payload.products.error;
      break;

    case ProductsActionTypes.FETCH_PRODUCTS:
      draftState.loadingStatus = LoadingState.LOADING;
      break;

    case ProductsActionTypes.SET_LOADING_STATUS:
      draftState.loadingStatus = action.payload;
      break;

    case ProductsActionTypes.SET_PRODUCTS_ITEMS:
      draftState.items = action.payload || [];
      draftState.loadingStatus = LoadingState.LOADED;
      break;

    case ProductsActionTypes.SET_RATING:
      delete draftState.queryParams.page;
      draftState.queryParams.rating = action.payload;
      break;

    case ProductsActionTypes.SET_MASTERCLASS_TYPE:
      delete draftState.queryParams.page;
      draftState.queryParams.type = action.payload;
      break;

    case ProductsActionTypes.SET_PRICE_RANGE: {
      delete draftState.queryParams.page;
      const [minPrice, maxPrice] = action.payload;
      draftState.queryParams.minPrice = minPrice;
      draftState.queryParams.maxPrice = maxPrice;
      break;
    }

    case ProductsActionTypes.SET_DATE_RANGE: {
      delete draftState.queryParams.page;
      const { dateFrom, dateTo } = action.payload;
      draftState.queryParams.dateFrom = dateFrom;
      draftState.queryParams.dateTo = dateTo;
      break;
    }

    case ProductsActionTypes.SET_SEARCH_QUERY:
      delete draftState.queryParams.page;
      draftState.queryParams.query = action.payload;
      break;

    case ProductsActionTypes.SET_PAGE_NUMBER:
      draftState.queryParams.page = action.payload;
      break;

    case ProductsActionTypes.SET_CHEF_IDS:
      delete draftState.queryParams.page;
      draftState.queryParams.chef_ids = action.payload;
      break;

    case ProductsActionTypes.SET_SUPPLIER_IDS:
      delete draftState.queryParams.page;
      draftState.queryParams.supplier_ids = action.payload;
      break;

    case ProductsActionTypes.SET_CUISINE_IDS:
      delete draftState.queryParams.page;
      draftState.queryParams.cuisine_ids = action.payload;
      break;
    case ProductsActionTypes.SET_CATEGORY_IDS:
      delete draftState.queryParams.page;
      draftState.queryParams.category_ids = action.payload;
      break;

    case ProductsActionTypes.SET_SORT_BY:
      delete draftState.queryParams.page;
      draftState.queryParams.orderBy = action.payload;
      break;

    case ProductsActionTypes.SET_TOTAL_COUNT:
      draftState.totalCount = action.payload;
      break;

    case ProductsActionTypes.SET_TAKE_COUNT:
      draftState.takeCount = action.payload;
      break;

    case ProductsActionTypes.SET_PRODUCTS_KIND:
      draftState.kind = action.payload;
      break;

    case ProductsActionTypes.SET_CHEF_TO_PRODUCT_STORE:
      draftState.items.forEach((item) => {
        if (Number(item.id) === action.payload.productId) {
          item.chef = action.payload.chef;
        }
      });
      break;

    case ProductsActionTypes.DELETE_CHEF_FROM_PRODUCT_STORE:
      draftState.items.forEach((item) => {
        if (Number(item.id) === action.payload) {
          item.chef = null;
        }
      });
      break;

    case ProductsActionTypes.RESET_PRODUCTS:
      resetState(draftState, initialProductsState);
      break;

    case ProductsActionTypes.SET_FILTERS: {
      delete draftState.queryParams.page;
      if (action.payload) {
        Object.entries(action.payload).forEach(([key, value]) => {
          if (value) {
            draftState.queryParams[key] = value;
          }
        });
      }
      break;
    }

    case ProductsActionTypes.REMOVE_FILTERS: {
      (action.payload ?? Object.keys(draftState.queryParams)).forEach((key) => {
        delete draftState.queryParams[key];
      });
      break;
    }

    default:
      break;
  }
}, initialProductsState);
