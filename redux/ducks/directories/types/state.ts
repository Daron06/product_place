import { Immutable } from 'immer';

import { DirectoriesResponse } from '../../../../services/types';
import { LoadingState } from '../../../types';

export interface DirectoriesState {
  data: DirectoriesResponse;
  status: LoadingState;
}

export type ImmutableDirectoriesState = Immutable<DirectoriesState>;
