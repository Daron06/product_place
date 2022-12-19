import { LoadingState, RootState } from '../../types';
import { ImmutableUserState } from './types/state';

export const selectUserState = (state: RootState): ImmutableUserState => state.user;

export const selectUserData = (state: RootState): ImmutableUserState['data'] => selectUserState(state).data;

export const selectUserIsAuth = (state: RootState): boolean => !!selectUserData(state);

export const selectUserStatus = (state: RootState): ImmutableUserState['status'] => selectUserState(state).status;

export const selectUserStatusLoading = (state: RootState): boolean => selectUserStatus(state) === LoadingState.LOADING;

export const selectUserStatusError = (state: RootState): boolean => selectUserStatus(state) === LoadingState.ERROR;

export const selectUserStatusSuccess = (state: RootState): boolean => selectUserStatus(state) === LoadingState.SUCCESS;

export const selectUserAuthErrorMessage = (state: RootState): string | undefined =>
  selectUserState(state).authErrorMessage;

export const selectUserErrors = (state: RootState): ImmutableUserState['errors'] => selectUserState(state).errors;
