import { ImmutableIngredientsState } from 'redux/ducks/admin/supplier/ingredients/types/state';
import { LoadingState } from 'redux/types';

export const initialIngredientsState = (): ImmutableIngredientsState => ({
  items: [],
  error: '',
  loadingStatus: LoadingState.NEVER,
  totalCount: 0,
  takeCount: 0,
  queryParams: {},
});
