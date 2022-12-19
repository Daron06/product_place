import { Action } from 'redux';
import { Chef } from 'redux/ducks/products/types/contracts';
import { HydrateAction, LoadingState } from 'redux/types';
import { ChefHas, ChefsQueryParams } from 'services/types';

export enum ChefsActionTypes {
  FETCH_CHEFS = 'CHEFS/FETCH_CHEFS',
  SET_CHEFS = 'CHEFS/SET_CHEFS',
  RESET_FILTERS = 'CHEFS/RESET_FILTERS',
  SET_LOADING_STATUS = 'CHEFS/SET_LOADING_STATUS',
  SET_CHEFS_TOTAL_COUNT = 'CHEFS/SET_CHEFS_TOTAL_COUNT',
  SET_CHEFS_TYPE = 'CHEFS/SET_CHEFS_TYPE',
  SET_CHEFS_PAGE_NUMBER = 'CHEFS/SET_CHEFS_PAGE_NUMBER',
  SET_CHEFS_SEARCH_QUERY = 'CHEFS/SET_CHEFS_SEARCH_QUERY',
  SET_CHEFS_FILTERS = 'CHEFS/SET_CHEFS_FILTERS',
  REMOVE_CHEFS_FILTERS = 'CHEFS/RESET_CHEFS_FILTERS',
}

export interface FetchChefsInterface extends Action<ChefsActionTypes> {
  type: ChefsActionTypes.FETCH_CHEFS;
  payload: LoadingState.LOADING;
}

export interface SetChefsInterface extends Action<ChefsActionTypes> {
  type: ChefsActionTypes.SET_CHEFS;
  payload: Chef[];
}

export interface SetChefsLoadingStatusInterface extends Action<ChefsActionTypes> {
  type: ChefsActionTypes.SET_LOADING_STATUS;
  payload: LoadingState;
}

export interface SetChefsTotalCount extends Action<ChefsActionTypes> {
  type: ChefsActionTypes.SET_CHEFS_TOTAL_COUNT;
  payload: number;
}

export interface SetChefsTypeInterface extends Action<ChefsActionTypes> {
  type: ChefsActionTypes.SET_CHEFS_TYPE;
  payload: ChefHas[];
}

export interface SetChefsPageNumberInterface extends Action<ChefsActionTypes> {
  type: ChefsActionTypes.SET_CHEFS_PAGE_NUMBER;
  payload: number;
}

export interface SetChefsSearchQueryInterface extends Action<ChefsActionTypes> {
  type: ChefsActionTypes.SET_CHEFS_SEARCH_QUERY;
  payload: string;
}

export interface SetChefsFiltersInterface extends Action<ChefsActionTypes> {
  type: ChefsActionTypes.SET_CHEFS_FILTERS;
  payload: ChefsQueryParams;
}

export interface RemoveChefsFilterInterface extends Action<ChefsActionTypes> {
  type: ChefsActionTypes.REMOVE_CHEFS_FILTERS;
  payload: Array<keyof ChefsQueryParams>;
}

export interface ResetChefsFilters extends Action<ChefsActionTypes> {
  type: ChefsActionTypes.RESET_FILTERS;
}

export type ChefsAction =
  | FetchChefsInterface
  | RemoveChefsFilterInterface
  | SetChefsFiltersInterface
  | SetChefsInterface
  | SetChefsLoadingStatusInterface
  | SetChefsTotalCount
  | SetChefsPageNumberInterface
  | SetChefsSearchQueryInterface
  | SetChefsTypeInterface
  | ResetChefsFilters
  | HydrateAction;
