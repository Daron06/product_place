/* eslint-disable no-param-reassign */

import produce, { castDraft, Draft } from 'immer';

import { equalProductBy, findCartItem } from '../../../utils/findCartItem';
import { sumTotalBy } from '../../../utils/sumTotalBy';
import { LoadingState } from '../../types';
import { initialUserState } from './constants';
import { CartAction, CartActionTypes } from './types/actions';
import { ImmutableCartState } from './types/state';

export const cartReducer = produce((draftState: Draft<ImmutableCartState>, action: CartAction) => {
  switch (action.type) {
    case CartActionTypes.FETCH_CART_DATA:
      draftState.loadingStatus = LoadingState.LOADING;
      break;

    case CartActionTypes.SET_COUPON:
      draftState.coupon = action.payload;
      break;

    case CartActionTypes.SET_CART_LOADING_STATUS:
      draftState.loadingStatus = action.payload;
      break;

    case CartActionTypes.CHANGE_PRODUCT_COUNT: {
      const { quantity } = action.payload;
      draftState.isAdding = true;

      // TODO: Remove castDraft when fix types
      const findItem = castDraft(findCartItem(draftState.items, action.payload));
      if (findItem) {
        findItem.quantity = quantity;
      } else {
        draftState.items.push({
          id: action.payload.id,
          quantity: action.payload.quantity,
          price: 0,
          image: '',
          name: '',
          product: {
            id: action.payload.id,
            type: action.payload.type,
            slug: action.payload.product.slug,
          },
          options: action.payload.options,
          type: action.payload.type,
        });
      }
      break;
    }

    case CartActionTypes.SET_CART_DATA: {
      const { products } = action.payload;
      draftState.loadingStatus = LoadingState.LOADED;
      draftState.items =
        products.map((obj) => ({
          ...obj,
          id: Number(obj.id),
          type: obj.product.type,
        })) || [];
      break;
    }

    case CartActionTypes.RESET_CART: {
      draftState.loadingStatus = LoadingState.LOADED;
      draftState.items = [];
      draftState.totalPrice = 0;
      draftState.totalCount = 0;
      break;
    }

    case CartActionTypes.UPDATE_CART_ITEM_FROM_RESPONSE: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { id, name, price, image, product, options, name__ar } = action.payload;

      draftState.isAdding = false;
      draftState.items = draftState.items.map((obj) => {
        if (equalProductBy(product.type, action.payload, obj)) {
          return {
            ...obj,
            id,
            image,
            price,
            name,
            name__ar,
            options,
          };
        }
        return obj;
      });
      draftState.loadingStatus = LoadingState.LOADED;
      break;
    }

    case CartActionTypes.REMOVE_PRODUCT_FROM_CART: {
      draftState.items = draftState.items.filter((obj) => Number(obj.id) !== Number(action.payload));
      break;
    }

    default:
      break;
  }

  draftState.totalPrice = draftState.items.reduce<number>((total, obj) => total + Number(obj.price), 0);
  draftState.totalCount = sumTotalBy(draftState.items, 'quantity');
}, initialUserState);
