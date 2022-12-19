import { Immutable } from 'immer';
import { FavoriteItem, ProductType } from 'redux/ducks/favorites/types/contracts';

export type FavoritesState = Record<ProductType, FavoriteItem[]>;

export type ImmutableFavoritesState = Immutable<FavoritesState>;
