import { Action } from 'redux';
import { ApiFavoriteParams, FavoriteItem, ProductType } from 'redux/ducks/favorites/types/contracts';

import { SetUserDataInterface, SignOutInterface } from '../../user/types/actions';

export enum FavoritesActionType {
  ADD_FAVORITE = 'FAVORITES/ADD_FAVORITE',
  DELETE_FAVORITE = 'FAVORITES/DELETE_FAVORITE',
  FETCH_FAVORITES_BY_TYPE = 'FAVORITES/FETCH_FAVORITES_BY_TYPE',
  SET_FAVORITES_BY_TYPE = 'FAVORITES/SET_FAVORITES_BY_TYPE',
}

export interface FetchFavoritesByTypeInterface extends Action<FavoritesActionType> {
  type: FavoritesActionType.FETCH_FAVORITES_BY_TYPE;
  payload: ProductType;
}

export interface SetFavoritesByTypeInterface extends Action<FavoritesActionType> {
  type: FavoritesActionType.SET_FAVORITES_BY_TYPE;
  payload: {
    type: ProductType;
    items: FavoriteItem[];
  };
}

export interface DeleteFavoriteInterface extends Action<FavoritesActionType> {
  type: FavoritesActionType.DELETE_FAVORITE;
  payload: ApiFavoriteParams;
}

export interface AddFavoriteInterface extends Action<FavoritesActionType> {
  type: FavoritesActionType.ADD_FAVORITE;
  payload: ApiFavoriteParams;
}

export type FavoritesAction =
  | AddFavoriteInterface
  | FetchFavoritesByTypeInterface
  | DeleteFavoriteInterface
  | SetFavoritesByTypeInterface
  | SetUserDataInterface
  | SignOutInterface;
