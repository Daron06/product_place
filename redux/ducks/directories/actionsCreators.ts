import { actionCreator } from '../../../utils/actionCreator';
import { DirectoriesActionTypes, SetDirectoriesInterface } from './types/actions';

export const setDirectories = actionCreator<SetDirectoriesInterface>(DirectoriesActionTypes.SET_DIRECTORIES);
