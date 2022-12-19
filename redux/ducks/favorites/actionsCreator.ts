import {
  AddFavoriteInterface,
  DeleteFavoriteInterface,
  FavoritesActionType,
  FetchFavoritesByTypeInterface,
  SetFavoritesByTypeInterface,
} from 'redux/ducks/favorites/types/actions';
import { actionCreator } from 'utils/actionCreator';

export const fetchFavoritesByType = actionCreator<FetchFavoritesByTypeInterface>(
  FavoritesActionType.FETCH_FAVORITES_BY_TYPE,
);

export const setFavoritesByType = actionCreator<SetFavoritesByTypeInterface>(FavoritesActionType.SET_FAVORITES_BY_TYPE);

export const addFavorite = actionCreator<AddFavoriteInterface>(FavoritesActionType.ADD_FAVORITE);

export const deleteFavorite = actionCreator<DeleteFavoriteInterface>(FavoritesActionType.DELETE_FAVORITE);
