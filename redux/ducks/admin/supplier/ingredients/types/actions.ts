import { Action } from 'redux';
import { AddIngredient } from 'redux/ducks/admin/supplier/ingredients/types/contracts';
import { LoadingState } from 'redux/types';
import { IngredientUpdate } from 'services/api/admin/IngredientsApi';
import { Ingredient, IngredientsQueryParams } from 'services/types';

export enum IngredientsActionTypes {
  ADD_INGREDIENT_REQUEST = 'INGREDIENTS/ADD_INGREDIENT_REQUEST',
  ADD_INGREDIENT_SUCCESS = 'INGREDIENTS/ADD_INGREDIENT',
  ACTIVATE_ITEMS = 'INGREDIENTS/ACTIVATE_ITEMS',
  CHANGE_PAGINATION = 'INGREDIENTS/CHANGE_PAGINATION',
  BLOCK_ITEMS = 'INGREDIENTS/BLOCK_ITEMS',
  FETCH_INGREDIENTS = 'INGREDIENTS/FETCH_INGREDIENTS',
  UPDATE_INGREDIENT = 'INGREDIENTS/UPDATE_INGREDIENT',
  REMOVE_INGREDIENT = 'INGREDIENTS/REMOVE_INGREDIENT',
  SET_INGREDIENTS_ITEMS = 'INGREDIENTS/SET_INGREDIENTS_ITEMS',
  SET_INGREDIENTS_LOADING_STATUS = 'INGREDIENTS/SET_INGREDIENTS_LOADING_STATUS',
  SET_INGREDIENTS_COUNT = 'INGREDIENTS/SET_CHEFS_TOTAL_COUNT',
  SET_INGREDIENTS_PAGE_NUMBER = 'INGREDIENTS/SET_INGREDIENTS_PAGE_NUMBER',
  SET_INGREDIENTS_FILTERS = 'INGREDIENTS/SET_INGREDIENTS_FILTERS',
  REMOVE_INGREDIENTS_FILTERS = 'INGREDIENTS/REMOVE_INGREDIENTS_FILTERS',
}

export interface FetchIngredientsInterface extends Action<IngredientsActionTypes> {
  type: IngredientsActionTypes.FETCH_INGREDIENTS;
  payload: {
    params?: IngredientsQueryParams;
  };
}

export interface ChangeIngredientsPaginationInterface extends Action<IngredientsActionTypes> {
  type: IngredientsActionTypes.CHANGE_PAGINATION;
  payload: number;
}

export interface ActivateIngredientItemsInterface extends Action<IngredientsActionTypes> {
  type: IngredientsActionTypes.ACTIVATE_ITEMS;
  payload: number[] | string;
}

export interface BlockIngredientItemsInterface extends Action<IngredientsActionTypes> {
  type: IngredientsActionTypes.BLOCK_ITEMS;
  payload: number[] | string;
}

export interface AddIngredientRequestInterface extends Action<IngredientsActionTypes> {
  type: IngredientsActionTypes.ADD_INGREDIENT_REQUEST;
  payload: AddIngredient;
}

export interface AddIngredientSuccessInterface extends Action<IngredientsActionTypes> {
  type: IngredientsActionTypes.ADD_INGREDIENT_SUCCESS;
  payload: Ingredient;
}

export interface SetIngredientsItemsInterface extends Action<IngredientsActionTypes> {
  type: IngredientsActionTypes.SET_INGREDIENTS_ITEMS;
  payload: { items: Ingredient[]; totalCount: number };
}

export interface SetIngredientsLoadingStatus extends Action<IngredientsActionTypes> {
  type: IngredientsActionTypes.SET_INGREDIENTS_LOADING_STATUS;
  payload: LoadingState;
}

export interface SetIngredientsTotalCount extends Action<IngredientsActionTypes> {
  type: IngredientsActionTypes.SET_INGREDIENTS_COUNT;
  payload: number;
}

export interface SetIngredientsPageNumberInterface extends Action<IngredientsActionTypes> {
  type: IngredientsActionTypes.SET_INGREDIENTS_PAGE_NUMBER;
  payload: number;
}

export interface SetIngredientsFiltersInterface extends Action<IngredientsActionTypes> {
  type: IngredientsActionTypes.SET_INGREDIENTS_FILTERS;
  payload: IngredientsQueryParams;
}

export interface RemoveIngredientsFilterInterface extends Action<IngredientsActionTypes> {
  type: IngredientsActionTypes.REMOVE_INGREDIENTS_FILTERS;
  payload: Array<keyof IngredientsQueryParams>;
}

export interface UpdateIngredientInterface extends Action<IngredientsActionTypes> {
  type: IngredientsActionTypes.UPDATE_INGREDIENT;
  payload: IngredientUpdate;
}

export interface RemoveIngredientInterface extends Action<IngredientsActionTypes> {
  type: IngredientsActionTypes.REMOVE_INGREDIENT;
  payload: number[] | string;
}

export type IngredientsActions =
  | AddIngredientRequestInterface
  | AddIngredientSuccessInterface
  | FetchIngredientsInterface
  | ChangeIngredientsPaginationInterface
  | SetIngredientsItemsInterface
  | SetIngredientsLoadingStatus
  | SetIngredientsTotalCount
  | SetIngredientsFiltersInterface
  | RemoveIngredientsFilterInterface
  | UpdateIngredientInterface
  | RemoveIngredientInterface
  | SetIngredientsPageNumberInterface;
