import { all, AllEffect, fork, ForkEffect } from 'redux-saga/effects';
import { supplierChefsSaga } from 'redux/ducks/admin/supplier/chefs/sagas';
import { chefsSaga } from 'redux/ducks/chefs/sagas';
import { favoritesSaga } from 'redux/ducks/favorites/sagas';
import { productsSaga } from 'redux/ducks/products/sagas';

import { adminProductsSaga } from './ducks/admin/products/sagas';
import { ingredientsSaga } from './ducks/admin/supplier/ingredients/sagas';
import { cartSaga } from './ducks/cart/sagas';
import { userSaga } from './ducks/user/sagas';

export default function* rootSaga(): IterableIterator<AllEffect<ForkEffect<void>>> {
  yield all([
    fork(adminProductsSaga),
    fork(supplierChefsSaga),
    fork(userSaga),
    fork(productsSaga),
    fork(chefsSaga),
    fork(favoritesSaga),
    fork(cartSaga),
    fork(ingredientsSaga),
  ]);
}
