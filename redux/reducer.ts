import { createSelectorHook } from 'react-redux';
import { combineReducers } from 'redux';
import { supplierChefsReducer } from 'redux/ducks/admin/supplier/chefs/reducer';
import { ingredientsReducer } from 'redux/ducks/admin/supplier/ingredients/reducer';
import { chefsReducer } from 'redux/ducks/chefs/reducer';
import { favoriteReducer } from 'redux/ducks/favorites/reducer';
import { productsReducer } from 'redux/ducks/products/reducer';

import { adminProductsReducer } from './ducks/admin/products/reducer';
import { cartReducer } from './ducks/cart/reducer';
import { directoriesReducer } from './ducks/directories/reducer';
import { userReducer } from './ducks/user/reducer';
import { combineReducersWithHydration } from './reducerCombiner';
import { RootState } from './types';

export const useTypedSelector = createSelectorHook<RootState>();

export const rootReducer = combineReducersWithHydration({
  chefs: chefsReducer,
  favorites: favoriteReducer,
  user: userReducer,
  products: productsReducer,
  directories: directoriesReducer,
  admin: combineReducers({
    products: adminProductsReducer,
    supplierChefs: supplierChefsReducer,
    ingredients: ingredientsReducer,
  }),
  cart: cartReducer,
});
