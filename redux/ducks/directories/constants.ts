import { LoadingState } from '../../types';
import { ImmutableDirectoriesState } from './types/state';

export const initialDirectoriesState: ImmutableDirectoriesState = {
  data: {
    suppliers: [],
    cuisines: [],
    allergens: [],
    required: [],
    menus: [],
    recipes: [],
    chefTables: [],
  },
  status: LoadingState.NEVER,
};
