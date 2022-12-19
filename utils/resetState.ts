/* eslint-disable no-param-reassign */
import { Immutable } from 'immer';

export const resetState = <T>(draftState: Immutable<T>, initState: T): void => {
  Object.entries(initState).forEach(([key, value]) => {
    draftState[key] = value;
  });
};
