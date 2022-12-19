import { SagaIterator } from '@redux-saga/types';
import Axios from 'core/axios';
import { HYDRATE } from 'next-redux-wrapper';
import { call, put, takeLatest } from 'redux-saga/effects';

import { AuthChefApi } from '../../../services/api/admin/AuthChefApi';
import { AuthApi } from '../../../services/api/AuthApi';
import { deleteCookie, setCookie } from '../../../utils/cookieUtils';
import { switchResponseErrors } from '../../../utils/switchResponseErrors';
import { HydrateAction, LoadingState } from '../../types';
import { setStatus, setUserData } from './actionsCreators';
import { SignInInterface, SignUpInterface, UserActionTypes } from './types/actions';
import { User } from './types/state';

function* signUpRequest({ payload }: SignUpInterface): SagaIterator {
  try {
    yield put(setStatus(LoadingState.LOADING));
    yield call(AuthApi.register, payload);
    yield put(setStatus(LoadingState.SUCCESS));
  } catch (error) {
    yield call(switchResponseErrors, error);
  }
}

function* signInRequest({ payload }: SignInInterface): SagaIterator {
  try {
    yield put(setStatus(LoadingState.LOADING));
    yield call(deleteCookie, 'token');
    const { data, token }: { data: User; token: string } = yield call(AuthApi.login, payload);
    yield put(setUserData(data));
    setCookie('token', token);
    window.localStorage.setItem('token', token);
    Axios.defaults.headers.Authorization = token;
  } catch (error) {
    yield call(switchResponseErrors, error);
  }
}

function* fetchUserDataRequest(): SagaIterator {
  try {
    const user: User = yield call(AuthApi.getMe);
    yield put(setUserData(user));
  } catch (error) {
    console.warn({
      target: 'fetchUserDataRequest',
      error,
    });
  }
}

export function* hydrateUserData({ payload }: HydrateAction): SagaIterator {
  const { user } = payload;
  yield put(setUserData(user.data ?? null));
}

function* signOutRequest(): SagaIterator {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('token');
    yield call(deleteCookie, 'token');
    if (typeof window !== 'undefined') {
      if (window.location.pathname.includes('admin')) {
        yield call(AuthChefApi.logout);
        window.location.href = '/admin';
      } else {
        yield call(AuthApi.logout);
        window.location.href = '/';
      }
    }
  }
}

export function* userSaga(): SagaIterator {
  yield takeLatest(HYDRATE, hydrateUserData);
  yield takeLatest(UserActionTypes.SIGN_OUT, signOutRequest);
  yield takeLatest(UserActionTypes.SIGN_IN, signInRequest);
  yield takeLatest(UserActionTypes.SIGN_UP, signUpRequest);
  yield takeLatest(UserActionTypes.FETCH_USER_DATA, fetchUserDataRequest);
}
