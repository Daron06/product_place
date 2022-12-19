import { AdminEndpoints } from '../../../../services/api/endpoints';
import { ProductsKindSearch } from '../../../../services/types';
import { LoadingState } from '../../../types';
import { ImmutableAdminProductsState } from './types/state';

export const initialProductState = (): ImmutableAdminProductsState => ({
  items: [],
  takeCount: 10,
  loadingStatus: LoadingState.NEVER,
  error: '',
  totalCount: 0,
  queryParams: {},
  kind: ProductsKindSearch.EMPTY,
  endpoint: AdminEndpoints.SUPPLIER_PRODUCTS,
  importedProducts: [],
});
