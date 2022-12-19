import { RootState } from 'redux/types';

import { ImmutableSupplierChefsState } from './types/state';

export const selectSupplierChefs = (state: RootState): ImmutableSupplierChefsState => state.admin.supplierChefs;
export const selectSupplierChefItems = (state: RootState): ImmutableSupplierChefsState['items'] =>
  state.admin.supplierChefs.items;
