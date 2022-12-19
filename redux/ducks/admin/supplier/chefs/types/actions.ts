import { Action } from 'redux';
import { LoadingState } from 'redux/types';
import { QueryParams } from 'services/types';

export enum SupplierActionsType {
  ACTIVATE_CHEF = 'SUPPLIER_CHEFS/ACTIVATE_SUPPLIER_CHEF',
  ACTIVATE_ITEMS = 'SUPPLIER_CHEFS/ACTIVATE_SUPPLIER_CHEF_ITEMS',
  BLOCK_CHEF = 'SUPPLIER_CHEFS/BLOCK_SUPPLIER_CHEF',
  CHANGE_PAGINATION = 'SUPPLIER_CHEFS/CHANGE_PAGINATION',
  DEACTIVATE_ITEMS = 'SUPPLIER_CHEFS/DEACTIVATE_SUPPLIER_CHEF_ITEMS',
  FETCH_SUPPLIER_CHEFS = 'SUPPLIER_CHEFS/FETCH_SUPPLIER_CHEFS',
  SET_LOADING = 'SUPPLIER_CHEFS/SET_LOADING',
  SET_SUPPLIER_CHEFS = 'SUPPLIER_CHEFS/SET_SUPPLIER_CHEFS',
}

export interface ActivateSupplierChefInterface extends Action<SupplierActionsType> {
  type: SupplierActionsType.ACTIVATE_CHEF;
  payload: string;
}

export interface BlockSupplierChefInterface extends Action<SupplierActionsType> {
  type: SupplierActionsType.BLOCK_CHEF;
  payload: string;
}

export interface FetchSupplierChefsInterface extends Action<SupplierActionsType> {
  type: SupplierActionsType.FETCH_SUPPLIER_CHEFS;
  payload: {
    params?: QueryParams;
  };
}

export interface SetSupplierChefsInterface extends Action<SupplierActionsType> {
  type: SupplierActionsType.SET_SUPPLIER_CHEFS;
  payload: any;
}

export interface SetSupplierChefsLoadingInterface extends Action<SupplierActionsType> {
  type: SupplierActionsType.SET_LOADING;
  payload: LoadingState;
}

export interface DeactivateSupplierChefsItemsInterface extends Action<SupplierActionsType> {
  type: SupplierActionsType.DEACTIVATE_ITEMS;
  payload: number[];
}

export interface ActivateSupplierChefsItemsInterface extends Action<SupplierActionsType> {
  type: SupplierActionsType.ACTIVATE_ITEMS;
  payload: number[];
}

export interface ChangeSupplierChefsPagination extends Action<SupplierActionsType> {
  type: SupplierActionsType.CHANGE_PAGINATION;
  payload: number;
}

export type SupplierChefsActions =
  | ActivateSupplierChefInterface
  | ActivateSupplierChefsItemsInterface
  | BlockSupplierChefInterface
  | ChangeSupplierChefsPagination
  | DeactivateSupplierChefsItemsInterface
  | FetchSupplierChefsInterface
  | SetSupplierChefsInterface
  | SetSupplierChefsLoadingInterface;
