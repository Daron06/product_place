import { SagaIterator } from '@redux-saga/types';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { ActivateProductsItemsInterface, DeactivateItemsInterface } from 'redux/ducks/admin/products/types/actions';
import { setSupplierChefs } from 'redux/ducks/admin/supplier/chefs/actionCreators';
import { selectSupplierChefs } from 'redux/ducks/admin/supplier/chefs/selectors';
import { SupplierActionsType } from 'redux/ducks/admin/supplier/chefs/types/actions';
import { ImmutableSupplierChefsState } from 'redux/ducks/admin/supplier/chefs/types/state';
import { SupplierApi } from 'services/api/admin/SupplierApi';

function* fetchSupplierChefs(): SagaIterator {
  try {
    const { queryParams }: ImmutableSupplierChefsState = yield select(selectSupplierChefs);
    const chefs = yield call(SupplierApi.getChefs, queryParams);

    yield put(
      setSupplierChefs({
        items: chefs.items,
        totalCount: chefs.meta.total,
      }),
    );
  } catch (error) {
    console.warn('fetchSupplierChefs', error);
  }
}

function* activateSupplierChefItemsRequest({ payload }: ActivateProductsItemsInterface): SagaIterator {
  try {
    yield call(SupplierApi.activateChefItems, payload);
  } catch (error) {
    console.warn('menuItemActivateRequest', error);
  }
}

function* deactivateSupplierChefItemsRequest({ payload }: DeactivateItemsInterface): SagaIterator {
  try {
    yield call(SupplierApi.deactivateChefItems, payload);
  } catch (error) {
    console.warn('menuItemDeactivateRequest', error);
  }
}

export function* supplierChefsSaga(): SagaIterator {
  yield takeLatest(
    [SupplierActionsType.FETCH_SUPPLIER_CHEFS, SupplierActionsType.CHANGE_PAGINATION],
    fetchSupplierChefs,
  );
  yield takeLatest(SupplierActionsType.DEACTIVATE_ITEMS, deactivateSupplierChefItemsRequest);
  yield takeLatest(SupplierActionsType.ACTIVATE_ITEMS, activateSupplierChefItemsRequest);
}
