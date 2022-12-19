import { RegisterFormFieldsProps } from 'components//AuthModal/forms/RegisterForm';
import { LoginFormFieldsProps } from 'components//Authorization/LoginForm/View';
import { Action } from 'redux';

import { LoadingState } from '../../../types';
import { ImmutableUserState, UserState } from './state';

export enum UserActionTypes {
  SET_USER_DATA = 'USER/SET_USER_DATA',
  FETCH_USER_DATA = 'USER/FETCH_USER_DATA',
  SIGN_OUT = 'USER/SIGN_OUT',
  SIGN_UP = 'USER/SIGN_UP',
  SIGN_IN = 'USER/SIGN_IN',
  SET_STATUS = 'USER/SET_STATUS',
  SET_ERRORS = 'USER/SET_ERRORS',
  SET_AUTH_ERROR_MESSAGE = 'USER/SET_AUTH_FORM_ERROR',
}

export interface SetAuthFormErrorMessageInterface extends Action<UserActionTypes> {
  type: UserActionTypes.SET_AUTH_ERROR_MESSAGE;
  payload: string | undefined;
}

export interface SetUserDataInterface extends Action<UserActionTypes> {
  type: UserActionTypes.SET_USER_DATA;
  payload: ImmutableUserState['data'];
}

export interface SetErrorsInterface extends Action<UserActionTypes> {
  type: UserActionTypes.SET_ERRORS;
  payload: UserState['errors'];
}

export interface FetchUserDataInterface extends Action<UserActionTypes> {
  type: UserActionTypes.FETCH_USER_DATA;
}

export interface SignOutInterface extends Action<UserActionTypes> {
  type: UserActionTypes.SIGN_OUT;
}

export interface SignUpInterface extends Action<UserActionTypes> {
  type: UserActionTypes.SIGN_UP;
  payload: RegisterFormFieldsProps;
}

export interface SignInInterface extends Action<UserActionTypes> {
  type: UserActionTypes.SIGN_IN;
  payload: LoginFormFieldsProps;
}

export interface SetStatusInterface extends Action<UserActionTypes> {
  type: UserActionTypes.SET_STATUS;
  payload: LoadingState;
}

export type UserAction =
  | SetUserDataInterface
  | FetchUserDataInterface
  | SignOutInterface
  | SignUpInterface
  | SetStatusInterface
  | SetErrorsInterface
  | SignInInterface
  | SetAuthFormErrorMessageInterface;
