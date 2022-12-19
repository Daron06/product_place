import { SagaIterator } from '@redux-saga/types';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  fetchIngredients,
  setIngredientsItems,
  setIngredientsLoadingStatus,
} from 'redux/ducks/admin/supplier/ingredients/actionCreators';
import { selectIngredientsQueryParams } from 'redux/ducks/admin/supplier/ingredients/selectors';
import {
  ActivateIngredientItemsInterface,
  BlockIngredientItemsInterface,
  IngredientsActionTypes,
  RemoveIngredientInterface,
} from 'redux/ducks/admin/supplier/ingredients/types/actions';
import { LoadingState } from 'redux/types';
import { IngredientsApi } from 'services/api/admin/IngredientsApi';

export function* fetchIngredientsSaga(): SagaIterator {
  try {
    const params = yield select(selectIngredientsQueryParams);
    yield put(setIngredientsLoadingStatus(LoadingState.LOADING));

    const { items, meta } = yield call(IngredientsApi.getAll, params);
    yield put(
      setIngredientsItems({
        items,
        totalCount: meta.total,
      }),
    );
  } catch (error) {
    console.warn('fetchIngredientsSaga', error);
  }
}

export function* activateIngredientRequest({ payload }: ActivateIngredientItemsInterface): SagaIterator {
  try {
    yield call(IngredientsApi.activate, payload);
    yield put(fetchIngredients());
  } catch (error) {
    console.warn('activateIngredientRequest', error);
  }
}

export function* blockIngredientRequest({ payload }: BlockIngredientItemsInterface): SagaIterator {
  try {
    yield call(IngredientsApi.deactivate, payload);
    yield put(fetchIngredients());
  } catch (error) {
    console.warn('activateIngredientRequest', error);
  }
}

export function* removeIngredientRequest({ payload }: RemoveIngredientInterface): SagaIterator {
  try {
    yield call(IngredientsApi.delete, payload);
    yield put(fetchIngredients());
  } catch (error) {
    console.warn('removeIngredientRequest', error);
  }
}

export function* ingredientsSaga(): SagaIterator {
  yield takeLatest(
    [IngredientsActionTypes.FETCH_INGREDIENTS, IngredientsActionTypes.CHANGE_PAGINATION],
    fetchIngredientsSaga,
  );

  yield takeLatest(IngredientsActionTypes.ACTIVATE_ITEMS, activateIngredientRequest);
  yield takeLatest(IngredientsActionTypes.BLOCK_ITEMS, blockIngredientRequest);
  yield takeLatest(IngredientsActionTypes.REMOVE_INGREDIENT, removeIngredientRequest);
}
