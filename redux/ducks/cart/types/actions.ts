import { Action } from 'redux';

import { LoadingState } from '../../../types';
import { ProductType } from '../../favorites/types/contracts';
import { CartData, CartOptionItem, CartProductItem } from '../constants';
import { CartState } from './state';

export enum CartActionTypes {
  SET_CART_DATA = 'CART/SET_CART_DATA',
  FETCH_CART_DATA = 'CART/FETCH_CART_DATA',
  CHANGE_PRODUCT_COUNT = 'CART/CHANGE_PRODUCT_COUNT',
  REMOVE_PRODUCT_FROM_CART = 'CART/REMOVE_PRODUCT_FROM_CART',
  UPDATE_CART_ITEM_FROM_RESPONSE = 'CART/UPDATE_CART_ITEM_FROM_RESPONSE',
  SET_CART_LOADING_STATUS = 'CART/SET_CART_LOADING_STATUS',
  RESET_CART = 'CART/RESET',
  SET_COUPON = 'CART/SET_CART_COUPON',
}

export interface ResetCartInterface extends Action<CartActionTypes> {
  type: CartActionTypes.RESET_CART;
  payload: CartData;
}

export interface SetCartDataInterface extends Action<CartActionTypes> {
  type: CartActionTypes.SET_CART_DATA;
  payload: CartData;
}

export interface SetCartLoadingStatus extends Action<CartActionTypes> {
  type: CartActionTypes.SET_CART_LOADING_STATUS;
  payload: LoadingState;
}

export interface UpdateCartItemFromResponseInterface extends Action<CartActionTypes> {
  type: CartActionTypes.UPDATE_CART_ITEM_FROM_RESPONSE;
  payload: CartProductItem;
}

export interface ChangeCartProductCountInterface extends Action<CartActionTypes> {
  type: CartActionTypes.CHANGE_PRODUCT_COUNT;
  payload: {
    id: number;
    quantity: number;
    type: ProductType;
    options?: CartOptionItem[];
    product: CartProductItem['product'];
  };
}

export interface RemoveProductFromCartInterface extends Action<CartActionTypes> {
  type: CartActionTypes.REMOVE_PRODUCT_FROM_CART;
  payload: string;
}

export interface SetCartCouponInterface extends Action<CartActionTypes> {
  type: CartActionTypes.SET_COUPON;
  payload: CartState['coupon'];
}

export interface FetchCartDataInterface extends Action<CartActionTypes> {
  type: CartActionTypes.FETCH_CART_DATA;
}

export type CartAction =
  | SetCartDataInterface
  | FetchCartDataInterface
  | ChangeCartProductCountInterface
  | RemoveProductFromCartInterface
  | UpdateCartItemFromResponseInterface
  | SetCartLoadingStatus
  | SetCartCouponInterface
  | ResetCartInterface;
