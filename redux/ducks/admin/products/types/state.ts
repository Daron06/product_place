import { Immutable } from 'immer';

import { AdminEndpoints } from '../../../../../services/api/endpoints';
import { ProductsState } from '../../../products/types/state';

export type AdminProductsState = ProductsState & { endpoint: AdminEndpoints; importedProducts: string[] };

export type ImmutableAdminProductsState = Immutable<AdminProductsState>;
