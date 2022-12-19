/* eslint-disable @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { setChefs, setChefsLoadingStatus, setChefsTotalCount } from 'redux/ducks/chefs/actionCreators';
import { selectChefsQueryParams } from 'redux/ducks/chefs/selectors';
import { ChefsActionTypes } from 'redux/ducks/chefs/types/actions';
import { ChefApi } from 'services/api/ChefApi';

import { ResponseChefs } from '../../../services/types';
import { LoadingState } from '../../types';

export function* fetchChefsRequest() {
  try {
    const params = yield select(selectChefsQueryParams);
    yield put(setChefsLoadingStatus(LoadingState.LOADING));
    const { items, meta }: ResponseChefs = yield call(ChefApi.getAll, params);
    yield put(setChefs(items));
    yield put(setChefsTotalCount(meta.total));
  } catch (error) {
    console.warn('fetchChefsRequest', error);
  }
}

export function* chefsSaga() {
  yield takeLatest(
    [
      ChefsActionTypes.FETCH_CHEFS,
      ChefsActionTypes.REMOVE_CHEFS_FILTERS,
      ChefsActionTypes.SET_CHEFS_TYPE,
      ChefsActionTypes.SET_CHEFS_PAGE_NUMBER,
      ChefsActionTypes.SET_CHEFS_SEARCH_QUERY,
    ],
    fetchChefsRequest,
  );
}
