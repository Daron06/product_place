/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action as ReduxAction } from 'redux';

export interface Action<T, P> extends ReduxAction<T> {
  payload?: P;
}

export const actionCreator = <T extends { type: any; payload?: unknown }>(type: T['type']) => (
  payload?: T['payload'],
): Action<T, T['payload']> => {
  return { type, payload };
};
