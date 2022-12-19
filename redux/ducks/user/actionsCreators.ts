import { RegisterFormFieldsProps } from 'components//AuthModal/forms/RegisterForm';
import { LoginFormFieldsProps } from 'components//Authorization/LoginForm/View';

import { LoadingState } from '../../types';
import {
  FetchUserDataInterface,
  SetAuthFormErrorMessageInterface,
  SetErrorsInterface,
  SetStatusInterface,
  SetUserDataInterface,
  SignInInterface,
  SignOutInterface,
  SignUpInterface,
  UserActionTypes,
} from './types/actions';
import { ImmutableUserState, UserState } from './types/state';

export const setUserData = (payload: ImmutableUserState['data']): SetUserDataInterface => ({
  type: UserActionTypes.SET_USER_DATA,
  payload,
});

export const fetchUserData = (): FetchUserDataInterface => ({
  type: UserActionTypes.FETCH_USER_DATA,
});

export const setAuthFormErrorMessage = (message?: string): SetAuthFormErrorMessageInterface => ({
  type: UserActionTypes.SET_AUTH_ERROR_MESSAGE,
  payload: message,
});

export const fetchSignUp = (formData: RegisterFormFieldsProps): SignUpInterface => ({
  type: UserActionTypes.SIGN_UP,
  payload: formData,
});

export const fetchSignIn = (formData: LoginFormFieldsProps): SignInInterface => ({
  type: UserActionTypes.SIGN_IN,
  payload: formData,
});

export const signOut = (): SignOutInterface => ({
  type: UserActionTypes.SIGN_OUT,
});

export const setStatus = (status: LoadingState): SetStatusInterface => ({
  type: UserActionTypes.SET_STATUS,
  payload: status,
});

export const setErrors = (errors: UserState['errors'] | undefined): SetErrorsInterface => ({
  type: UserActionTypes.SET_ERRORS,
  payload: errors ?? null,
});
