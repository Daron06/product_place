import { Immutable } from 'immer';
import { Chef } from 'redux/ducks/products/types/contracts';
import { LoadingState } from 'redux/types';
import { ChefsQueryParams } from 'services/types';

export interface ChefsState {
  items: Chef[] | undefined;
  loadingStatus: LoadingState;
  error: string;
  totalCount: number;
  takeCount: number;
  queryParams: ChefsQueryParams;
}

export type ImmutableChefsState = Immutable<ChefsState>;
