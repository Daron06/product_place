import { ProductsState } from 'redux/ducks/products/types/state';
import { ProductQueryParams, ProductsKindSearch } from 'services/types';

import { LoadingState } from '../../types';

export const initialProductsState: ProductsState = {
  items: [],
  loadingStatus: LoadingState.NEVER,
  kind: ProductsKindSearch.EMPTY,
  error: '',
  queryParams: {},
  totalCount: 0,
  takeCount: 10,
};

export const productsQueryKeyParams: Array<keyof ProductQueryParams> = [
  'category_ids',
  'supplier_ids',
  'people',
  'duration',
  'type',
  'included',
  'types',
  'chef_ids',
  'cuisine_ids',
  'orderBy',
  'page',
  'take',
  'takeCount',
  'rating',
  'minPrice',
  'maxPrice',
  'dateFrom',
  'dateTo',
  'query',
  'status',
];
