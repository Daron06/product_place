import { Immutable } from 'immer';
import { SupplierChef } from 'redux/ducks/admin/supplier/chefs/types/contracts';
import { LoadingState } from 'redux/types';
import { QueryParams } from 'services/types';

export interface SupplierChefsState {
  items: SupplierChef[];
  loadingStatus: LoadingState;
  error: string;
  queryParams: QueryParams;
  totalCount: number;
  takeCount: number;
}

export type ImmutableSupplierChefsState = Immutable<SupplierChefsState>;
