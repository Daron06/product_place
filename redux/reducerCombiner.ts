/* eslint-disable @typescript-eslint/no-explicit-any,no-param-reassign */
import produce, { Draft } from 'immer';
import { HYDRATE } from 'next-redux-wrapper';
import { CombinedState, combineReducers, Reducer, ReducersMapObject } from 'redux';

import { StoreActions } from './store';
import { RootState } from './types';

export const combineReducersWithHydration = (
  reducersMap: ReducersMapObject<any, any>,
): Reducer<RootState, StoreActions> => {
  const reducersMapWithHydration = Object.keys(reducersMap).reduce((acc, reducerKey) => {
    acc[reducerKey] = (state: RootState, action: StoreActions): Reducer<CombinedState<RootState>> => {
      let nextState = state;

      if (
        typeof window !== 'undefined' &&
        window.location.pathname.includes('admin') &&
        action.type === HYDRATE &&
        action.payload[reducerKey]
      ) {
        nextState = produce(nextState, (draft: Draft<{ [key: string]: any }>) => {
          Object.entries(action.payload[reducerKey]).forEach(([key, value]) => {
            draft[key] = value;
          });
        });
      }

      return reducersMap[reducerKey](nextState, action);
    };

    return acc;
  }, {} as ReducersMapObject<RootState, StoreActions>);

  return combineReducers<RootState, StoreActions>(reducersMapWithHydration);
};
