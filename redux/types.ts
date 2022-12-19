import { HYDRATE } from 'next-redux-wrapper';
import { ImmutableSupplierChefsState } from 'redux/ducks/admin/supplier/chefs/types/state';
import { ImmutableIngredientsState } from 'redux/ducks/admin/supplier/ingredients/types/state';
import { ImmutableChefsState } from 'redux/ducks/chefs/types/state';
import { ImmutableFavoritesState } from 'redux/ducks/favorites/types/state';

import { ImmutableAdminProductsState } from './ducks/admin/products/types/state';
import { ImmutableCartState } from './ducks/cart/types/state';
import { ImmutableDirectoriesState } from './ducks/directories/types/state';
import { ImmutableProductsState } from './ducks/products/types/state';
import { ImmutableUserState } from './ducks/user/types/state';

export enum LoadingState {
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  NEVER = 'NEVER',
}

export interface HydrateAction {
  type: typeof HYDRATE;
  payload: RootState;
}

export interface RootState {
  chefs: ImmutableChefsState;
  favorites: ImmutableFavoritesState;
  user: ImmutableUserState;
  products: ImmutableProductsState;
  directories: ImmutableDirectoriesState;
  admin: {
    products: ImmutableAdminProductsState;
    supplierChefs: ImmutableSupplierChefsState;
    ingredients: ImmutableIngredientsState;
  };
  cart: ImmutableCartState;
}
