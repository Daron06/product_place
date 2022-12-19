/* eslint-disable @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types */
import { SagaIterator } from '@redux-saga/types';
import {
  AddFavoriteInterface,
  DeleteFavoriteInterface,
  FavoritesActionType,
  FetchFavoritesByTypeInterface,
} from 'redux/ducks/favorites/types/actions';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { FavoritesApi } from 'services/api/FavoritesApi';

import { setFavoritesByType } from './actionsCreator';

function* fetchAllFavoriteRequest({ payload }: FetchFavoritesByTypeInterface): SagaIterator {
  try {
    const { items } = yield call(FavoritesApi.getByType, payload);

    yield put(
      setFavoritesByType({
        type: payload,
        items,
      }),
    );
  } catch (error) {
    console.warn('[ERROR] fetchAllFavoriteRequest', error);
  }
}

function* addFavoriteRequest({ payload }: AddFavoriteInterface): SagaIterator {
  try {
    yield call(FavoritesApi.add, { [payload.type === 'chef' ? 'chefId' : 'productId']: payload.id });
  } catch (error) {
    console.warn('[ERROR] addFavoriteRequest', error);
  }
}

function* deleteFavoriteRequest({ payload }: DeleteFavoriteInterface): SagaIterator {
  try {
    yield call(FavoritesApi.delete, payload);
  } catch (error) {
    console.warn('[ERROR] deleteFavoriteRequest', error);
  }
}

export function* favoritesSaga(): SagaIterator {
  yield takeLatest(FavoritesActionType.FETCH_FAVORITES_BY_TYPE, fetchAllFavoriteRequest);
  yield debounce(500, FavoritesActionType.ADD_FAVORITE, addFavoriteRequest);
  yield debounce(500, FavoritesActionType.DELETE_FAVORITE, deleteFavoriteRequest);
}
