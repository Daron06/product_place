import { ImmutableFavoritesState } from 'redux/ducks/favorites/types/state';
import { RootState } from 'redux/types';

import { ProductType } from './types/contracts';

export const selectFavoritesByType = (type: ProductType) => (state: RootState): ImmutableFavoritesState[ProductType] =>
  state.favorites[type];
