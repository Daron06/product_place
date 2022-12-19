import { Immutable } from 'immer';
import { LoadingState } from 'redux/types';
import { Ingredient, IngredientsQueryParams } from 'services/types';

export interface IngredientsState {
  items: Ingredient[];
  loadingStatus: LoadingState;
  error: string;
  queryParams: IngredientsQueryParams;
  totalCount: number;
  takeCount: number;
}

export type ImmutableIngredientsState = Immutable<IngredientsState>;
