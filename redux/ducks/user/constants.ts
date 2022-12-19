import { LoadingState } from '../../types';
import { ImmutableUserState } from './types/state';

export const initialUserState: ImmutableUserState = {
  data: null,
  errors: null,
  status: LoadingState.NEVER,
};
