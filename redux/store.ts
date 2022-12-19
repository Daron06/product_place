import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import createSagaMiddleware, { Task } from 'redux-saga';

import { AdminProductsActions } from './ducks/admin/products/types/actions';
import { DirectoriesAction } from './ducks/directories/types/actions';
import { ProductsAction } from './ducks/products/types/actions';
import { UserAction } from './ducks/user/types/actions';
import { rootReducer } from './reducer';
import rootSaga from './sagas';
import { HydrateAction, RootState } from './types';

export interface SagaStore extends Store {
  sagaTask?: Task;
}

const composeEnhancers =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  typeof window !== 'undefined' ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

export type StoreActions = UserAction | ProductsAction | DirectoriesAction | AdminProductsActions | HydrateAction;

const makeStore: MakeStore<RootState> = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper<RootState>(makeStore, {
  debug: false,
});
