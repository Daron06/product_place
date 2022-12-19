import { SagaIterator } from '@redux-saga/types';
import { nanoid } from 'nanoid';
import { call, put, takeEvery } from 'redux-saga/effects';

import { CartApi } from '../../../services/api/CartApi';
import { LoadingState } from '../../types';
import {
  removeProductFromCart,
  setCartData,
  setCartLoadingStatus,
  updateCartItemFromResponse,
} from './actionsCreators';
import { CartData } from './constants';
import { CartActionTypes, ChangeCartProductCountInterface, RemoveProductFromCartInterface } from './types/actions';

function* fetchCartDataRequest(): SagaIterator {
  try {
    const cartToken = typeof window !== 'undefined' && window.localStorage.getItem('cartToken');
    if (cartToken) {
      const cart: CartData = yield call(CartApi.get, `${cartToken}?${Math.round(Math.random() * 100)}` || '');
      yield put(setCartData(cart));
    }
  } catch (error) {
    console.warn({
      target: 'fetchCartDataRequest',
      error,
    });
  } finally {
    yield put(setCartLoadingStatus(LoadingState.LOADED));
  }
}

function* fetchChangeProductCountRequest({ payload }: ChangeCartProductCountInterface): SagaIterator {
  try {
    if (typeof window !== 'undefined') {
      let cartToken = window.localStorage.getItem('cartToken');

      if (!cartToken) {
        cartToken = nanoid();
        window.localStorage.setItem('cartToken', cartToken);
      }

      const response = yield call(CartApi.addItem, {
        productId: payload.id,
        quantity: payload.quantity,
        options: payload.options?.length ? payload.options?.filter(Boolean).map((o) => o.id) : [],
        token: cartToken,
      });

      const product = {
        id: response.id,
        name: response.name,
        name__ar: response.name__ar,
        quantity: response.quantity,
        price: response.price,
        image: response.image,
        product: { id: response.product.id, type: response.product.type, slug: response.product.slug },
        type: response.product.type,
        options: response.options,
      };

      yield put(updateCartItemFromResponse(product));
    }
  } catch (error) {
    const msg = error?.response?.data?.message;
    if (msg) {
      window.notify?.open(msg, 'error');
    }
    yield put(removeProductFromCart(`${payload.id}`));
    console.warn({
      target: 'fetchChangeProductCountRequest',
      error,
    });
  }
}

function* fetchRemoveProductFromCartRequest({ payload }: RemoveProductFromCartInterface): SagaIterator {
  try {
    if (typeof window !== 'undefined') {
      const cartToken = window.localStorage.getItem('cartToken');

      if (cartToken) {
        yield call(CartApi.removeItem, Number(payload), cartToken);
      }
    }
  } catch (error) {
    console.warn({
      target: 'fetchRemoveProductFromCartRequest',
      error,
    });
  }
}

export function* cartSaga(): SagaIterator {
  yield takeEvery(CartActionTypes.FETCH_CART_DATA, fetchCartDataRequest);
  yield takeEvery(CartActionTypes.CHANGE_PRODUCT_COUNT, fetchChangeProductCountRequest);
  yield takeEvery(CartActionTypes.REMOVE_PRODUCT_FROM_CART, fetchRemoveProductFromCartRequest);
}
