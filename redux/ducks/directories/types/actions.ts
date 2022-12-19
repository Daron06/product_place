import { Action } from 'redux';

import { DirectoriesResponse } from '../../../../services/types';
import { HydrateAction } from '../../../types';

export enum DirectoriesActionTypes {
  SET_DIRECTORIES = 'DIRECTORIES/SET_DIRECTORIES',
}

export interface SetDirectoriesInterface extends Action<DirectoriesActionTypes> {
  type: DirectoriesActionTypes.SET_DIRECTORIES;
  payload: DirectoriesResponse;
}

export type DirectoriesAction = SetDirectoriesInterface | HydrateAction;
