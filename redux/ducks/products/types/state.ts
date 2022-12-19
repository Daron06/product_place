import { Immutable } from 'immer';
import { Chef, Product } from 'redux/ducks/products/types/contracts';
import { LoadingState } from 'redux/types';
import { ProductQueryParams, ProductsKindSearch } from 'services/types';

export type ProductChefNullable = Omit<Product, 'chef'> & { chef: Chef | null };

export interface ProductsState {
  items: ProductChefNullable[];
  loadingStatus: LoadingState;
  kind: ProductsKindSearch;
  error: string;
  queryParams: ProductQueryParams;
  totalCount: number;
  takeCount: number;
}

export type ImmutableProductsState = Immutable<ProductsState>;
