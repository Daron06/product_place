/* eslint-disable @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { setLoadingStatus, setProductsItems, setTotalCount } from 'redux/ducks/products/actionCreators';
import { selectProductsKind, selectProductsQueryParams } from 'redux/ducks/products/selectors';
import { ProductsActionTypes } from 'redux/ducks/products/types/actions';
import { AdminEndpoints, Endpoints } from 'services/api/endpoints';
import { ProductsApi } from 'services/api/ProductsApi';
import { ProductsKindSearch, ResponseProducts } from 'services/types';

import { LoadingState } from '../../types';

const getUrlByProductsKind = (kind: ProductsKindSearch) => {
  const urls = {
    recipe: Endpoints.PRODUCT_RECIPES,
    menu: Endpoints.PRODUCT_MENU,
    chefTable: Endpoints.PRODUCT_CHEF_TABLE,
    masterClasses: Endpoints.PRODUCT_MASTER_CLASSES,
    'chefs-store': Endpoints.PRODUCT_CHEF_STORE,
    'admin-chefs-store': AdminEndpoints.PRODUCT_STORE,
    default: 'unknown',
  };
  return kind in urls ? urls[kind] : urls.default;
};

export function* fetchProductsRequest() {
  try {
    const params = yield select(selectProductsQueryParams);
    const productsKind = yield select(selectProductsKind);
    const url = getUrlByProductsKind(productsKind);

    if (url === 'unknown') {
      throw new Error(
        `The getUrlByProductsKind expected one of the arguments from ProductsKindSearch enum, but received ${url}`,
      );
    }

    yield put(setLoadingStatus(LoadingState.LOADING));
    const { items, meta }: ResponseProducts = yield call(ProductsApi.getAll, url, params);
    yield put(setProductsItems(items));
    yield put(setTotalCount(meta.total));
  } catch (error) {
    console.warn('fetchProductsRequest', error);
  }
}

export function* productsSaga() {
  yield takeLatest(
    [
      ProductsActionTypes.FETCH_PRODUCTS,
      ProductsActionTypes.SET_SORT_BY,
      ProductsActionTypes.SET_CUISINE_IDS,
      ProductsActionTypes.SET_PRICE_RANGE,
      ProductsActionTypes.SET_DATE_RANGE,
      ProductsActionTypes.SET_CHEF_IDS,
      ProductsActionTypes.SET_RATING,
      ProductsActionTypes.SET_MASTERCLASS_TYPE,
      ProductsActionTypes.SET_SUPPLIER_IDS,
      ProductsActionTypes.SET_CATEGORY_IDS,
      ProductsActionTypes.SET_PAGE_NUMBER,
      ProductsActionTypes.SET_SEARCH_QUERY,
      ProductsActionTypes.SET_FILTERS,
      ProductsActionTypes.REMOVE_FILTERS,
    ],
    fetchProductsRequest,
  );
}
