import { Action } from 'redux';
import { Product } from 'redux/ducks/products/types/contracts';

export enum ProductDetailsActionTypes {
  SET_LOADING = 'MENU_ITEMS/SET_LOADING',
  SET_PRODUCT_DETAILS = 'MENU_ITEMS/SET_PRODUCT_DETAILS',
}

export interface SetLoading extends Action<ProductDetailsActionTypes> {
  type: ProductDetailsActionTypes.SET_LOADING;
  payload: boolean;
}

export interface SetProductsDetails extends Action<ProductDetailsActionTypes> {
  type: ProductDetailsActionTypes.SET_PRODUCT_DETAILS;
  payload: Product;
}
