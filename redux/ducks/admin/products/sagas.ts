import { SagaIterator } from '@redux-saga/types';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { AdminProductsApi } from '../../../../services/api/admin/ProductsApi';
import { ResponseProducts } from '../../../../services/types';
import { fetchProductsItems, setProductsItems } from './actionCreators';
import { selectAdminProductsEndpoint, selectAdminProductsState } from './selectors';
import {
  ActivateProductsItemsInterface,
  AdminProductsActionsTypes,
  DeleteProductsItemsInterface,
  ImportProductStore,
} from './types/actions';
import { ImmutableAdminProductsState } from './types/state';

function* fetchProductsRequest(): SagaIterator {
  try {
    const { endpoint, queryParams }: ImmutableAdminProductsState = yield select(selectAdminProductsState);
    const products: ResponseProducts = yield call(AdminProductsApi.getAll, endpoint, {
      page: queryParams.page,
    });

    yield put(
      setProductsItems({
        items: products.items,
        totalCount: products.meta.total,
      }),
    );
  } catch (error) {
    console.warn('fetchProductsRequest', error);
  }
}

function* activateProductsItemsRequest({ payload }: ActivateProductsItemsInterface): SagaIterator {
  try {
    yield call(AdminProductsApi.activate, payload);
  } catch (error) {
    console.warn('menuItemActivateRequest', error);
  }
}

function* deactivateProductsItemsRequest({ payload }: ActivateProductsItemsInterface): SagaIterator {
  try {
    yield call(AdminProductsApi.deactivate, payload);
  } catch (error) {
    console.warn('menuItemDeactivateRequest', error);
  }
}

function* deleteProductsItemsRequest({ payload }: DeleteProductsItemsInterface): SagaIterator {
  try {
    yield call(AdminProductsApi.delete, payload);
    const endpoint = yield select(selectAdminProductsEndpoint);
    yield put(
      fetchProductsItems({
        endpoint,
      }),
    );
    yield call(fetchProductsRequest);
  } catch (error) {
    console.warn('menuItemDeleteRequest', error);
  }
}

function* importProductToStore({ payload }: ImportProductStore): SagaIterator {
  try {
    yield call(AdminProductsApi.importProduct, payload);
  } catch (error) {
    console.warn('importProductToStore', error);
  }
}

export function* adminProductsSaga(): SagaIterator {
  yield takeLatest(
    [AdminProductsActionsTypes.FETCH_ITEMS, AdminProductsActionsTypes.CHANGE_PAGINATION],
    fetchProductsRequest,
  );
  yield takeLatest(AdminProductsActionsTypes.ACTIVATE_ITEMS, activateProductsItemsRequest);
  yield takeLatest(AdminProductsActionsTypes.DEACTIVATE_ITEMS, deactivateProductsItemsRequest);
  yield takeLatest(AdminProductsActionsTypes.DELETE_ITEMS, deleteProductsItemsRequest);
  yield takeLatest(AdminProductsActionsTypes.IMPORT_PRODUCT_TO_STORE, importProductToStore);
}
