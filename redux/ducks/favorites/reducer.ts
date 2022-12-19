/* eslint-disable no-param-reassign */
import produce, { Draft } from 'immer';
import forEach from 'lodash/forEach';
import groupBy from 'lodash/groupBy';
import { initialFavorites } from 'redux/ducks/favorites/constants';
import { FavoritesAction, FavoritesActionType } from 'redux/ducks/favorites/types/actions';
import { ImmutableFavoritesState } from 'redux/ducks/favorites/types/state';

import { UserActionTypes } from '../user/types/actions';

export const favoriteReducer = produce((draftState: Draft<ImmutableFavoritesState>, action: FavoritesAction) => {
  switch (action.type) {
    case UserActionTypes.SIGN_OUT: {
      draftState = initialFavorites;
      break;
    }

    case FavoritesActionType.SET_FAVORITES_BY_TYPE: {
      const { type, items } = action.payload;
      draftState[type] = items;
      break;
    }

    case FavoritesActionType.ADD_FAVORITE: {
      const { type, id } = action.payload;
      draftState[type].push({ id });
      break;
    }

    case FavoritesActionType.DELETE_FAVORITE: {
      const { type, id } = action.payload;
      draftState[type] = draftState[type].filter((obj) => Number(obj.id) !== Number(id));
      break;
    }

    case UserActionTypes.SET_USER_DATA: {
      if (action.payload) {
        const { favorites } = action.payload;
        forEach(groupBy(favorites, 'type'), (valueArr, key) => {
          draftState[key] = valueArr.map(({ typeId }) => ({ id: typeId }));
        });
      }
      break;
    }

    default:
      break;
  }
}, initialFavorites);
