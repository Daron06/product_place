import { ImmutableSupplierChefsState } from 'redux/ducks/admin/supplier/chefs/types/state';
import { LoadingState } from 'redux/types';

export const initialSupplierChefsState = (): ImmutableSupplierChefsState => ({
  error: '',
  items: [],
  loadingStatus: LoadingState.NEVER,
  queryParams: {},
  takeCount: 6,
  totalCount: 6,
});
