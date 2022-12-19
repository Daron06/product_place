import { castDraft } from 'immer';
import { put, PutEffect } from 'redux-saga/effects';

import { setAuthFormErrorMessage, setErrors, setStatus } from '../redux/ducks/user/actionsCreators';
import { LoadingState } from '../redux/types';
import { responseErrorsNormalize } from './responseErrorsNormalize';

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export function* switchResponseErrors(error: any): IterableIterator<PutEffect> {
  const { message } = error.response.data;
  switch (error.response.status) {
    case 404:
    case 401:
      yield put(setAuthFormErrorMessage(message || 'Email or password incorrect'));
      yield put(setStatus(LoadingState.NEVER));
      break;
    case 403:
      yield put(setAuthFormErrorMessage(message || 'Account disabled please contact to support'));
      yield put(setStatus(LoadingState.NEVER));
      break;
    case 422: {
      const normalizeErrors = responseErrorsNormalize(error.response?.data?.errors);
      yield put(setStatus(LoadingState.NEVER));
      yield put(setErrors(castDraft(normalizeErrors)));
      break;
    }
    default:
      yield put(setStatus(LoadingState.ERROR));
      break;
  }
}
