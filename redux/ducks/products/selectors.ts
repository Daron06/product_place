import { ImmutableProductsState } from 'redux/ducks/products/types/state';
import { OrderByProduct, ProductsKindSearch } from 'services/types';

import { LoadingState, RootState } from '../../types';

export const selectProducts = (state: RootState): ImmutableProductsState => state.products;

export const selectProductsItems = (state: RootState): ImmutableProductsState['items'] => state.products.items;

export const selectProductsLoadingStatus = (state: RootState): ImmutableProductsState['loadingStatus'] =>
  state.products.loadingStatus;

export const selectProductsIsLoading = (state: RootState): boolean =>
  state.products.loadingStatus === LoadingState.LOADING;

export const selectProductsIsLoaded = (state: RootState): boolean =>
  state.products.loadingStatus === LoadingState.LOADED;

export const selectProductsTotalCount = (state: RootState): number => state.products.totalCount;

export const selectProductsTakeCount = (state: RootState): number => state.products.takeCount;

export const selectProductsCurrentPage = (state: RootState): number | undefined => state.products.queryParams.page;

export const selectProductsQueryParams = (state: RootState): ImmutableProductsState['queryParams'] => ({
  ...state.products.queryParams,
  take: state.products.takeCount,
});

export const selectProductsSearchQuery = (state: RootState): string | undefined => state.products.queryParams.query;

export const selectProductsOrderBy = (state: RootState): OrderByProduct | undefined =>
  state.products.queryParams.orderBy;

export const selectProductsKind = (state: RootState): ProductsKindSearch => state.products.kind;
