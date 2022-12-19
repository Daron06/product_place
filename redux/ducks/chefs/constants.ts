import { ImmutableChefsState } from 'redux/ducks/chefs/types/state';
import { LoadingState } from 'redux/types';

export const initialChefsState = (): ImmutableChefsState => ({
  items: [],
  error: '',
  loadingStatus: LoadingState.NEVER,
  totalCount: 0,
  takeCount: 50,
  queryParams: {
    take: 50,
  },
});
