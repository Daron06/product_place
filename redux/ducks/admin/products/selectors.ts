import { RootState } from '../../../types';
import { ImmutableAdminProductsState } from './types/state';

export const selectAdminProductsState = (state: RootState): ImmutableAdminProductsState => state.admin.products;

export const selectAdminImportedProductsState = (state: RootState): ImmutableAdminProductsState['importedProducts'] =>
  state.admin.products.importedProducts;

export const selectAdminProductsEndpoint = (state: RootState): ImmutableAdminProductsState['endpoint'] =>
  selectAdminProductsState(state).endpoint;
