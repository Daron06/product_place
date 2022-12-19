import { Immutable } from 'immer';
import { Action } from 'redux';

import { AdminEndpoints } from '../../../../../services/api/endpoints';
import { ProductQueryParams } from '../../../../../services/types';
import { LoadingState } from '../../../../types';
import { Product } from '../../../products/types/contracts';

export enum AdminProductsActionsTypes {
  SET_LOADING = 'ADMIN_PRODUCTS/SET_LOADING',
  SET_ITEMS = 'ADMIN_PRODUCTS/SET_ITEMS',
  SET_SELECTED_ITEMS = 'ADMIN_PRODUCTS/SET_SELECTED_ITEMS',
  FETCH_ITEMS = 'ADMIN_PRODUCTS/FETCH_ITEMS',
  CHANGE_PAGINATION = 'ADMIN_PRODUCTS/CHANGE_PAGINATION',
  ACTIVATE_ITEMS = 'ADMIN_PRODUCTS/ACTIVATE_ITEMS',
  DEACTIVATE_ITEMS = 'ADMIN_PRODUCTS/DEACTIVATE_ITEMS',
  DELETE_ITEMS = 'ADMIN_PRODUCTS/DELETE_MENU_ITEMS',
  SET_PRODUCTS_ENDPOINT = 'PRODUCTS/SET_PRODUCTS_ENDPOINT',
  RESET = 'PRODUCTS/RESET',
  IMPORT_PRODUCT_TO_STORE = 'PRODUCTS/IMPORT_PRODUCT_TO_STORE',
}

export interface SetProductsEndpointInterface extends Action<AdminProductsActionsTypes> {
  type: AdminProductsActionsTypes.SET_PRODUCTS_ENDPOINT;
  payload: AdminEndpoints;
}

export interface ResetProductsInterface extends Action<AdminProductsActionsTypes> {
  type: AdminProductsActionsTypes.RESET;
}

export interface SetLoadingInterface extends Action<AdminProductsActionsTypes> {
  type: AdminProductsActionsTypes.SET_LOADING;
  payload: LoadingState;
}

export interface SetProductsItemsInterface extends Action<AdminProductsActionsTypes> {
  type: AdminProductsActionsTypes.SET_ITEMS;
  payload: Immutable<{ items: Product[] | undefined; totalCount: number }>;
}

export interface FetchProductsItemsInterface extends Action<AdminProductsActionsTypes> {
  type: AdminProductsActionsTypes.FETCH_ITEMS;
  payload: {
    endpoint: AdminEndpoints;
    params?: ProductQueryParams;
  };
}

export interface ChangePaginationInterface extends Action<AdminProductsActionsTypes> {
  type: AdminProductsActionsTypes.CHANGE_PAGINATION;
  payload: number;
}

export interface SetSelectedProductsItemsInterface extends Action<AdminProductsActionsTypes> {
  type: AdminProductsActionsTypes.SET_SELECTED_ITEMS;
  payload: number[];
}

export interface ActivateProductsItemsInterface extends Action<AdminProductsActionsTypes> {
  type: AdminProductsActionsTypes.ACTIVATE_ITEMS;
  payload: number[];
}

export interface DeactivateItemsInterface extends Action<AdminProductsActionsTypes> {
  type: AdminProductsActionsTypes.DEACTIVATE_ITEMS;
  payload: number[];
}

export interface DeleteProductsItemsInterface extends Action<AdminProductsActionsTypes> {
  type: AdminProductsActionsTypes.DELETE_ITEMS;
  payload: number[];
}

export interface ImportProductStore extends Action<AdminProductsActionsTypes> {
  type: AdminProductsActionsTypes.IMPORT_PRODUCT_TO_STORE;
  payload: string;
}

export type AdminProductsActions =
  | ActivateProductsItemsInterface
  | ImportProductStore
  | ChangePaginationInterface
  | DeactivateItemsInterface
  | DeleteProductsItemsInterface
  | FetchProductsItemsInterface
  | SetLoadingInterface
  | SetProductsItemsInterface
  | SetSelectedProductsItemsInterface
  | SetProductsEndpointInterface
  | ResetProductsInterface;
