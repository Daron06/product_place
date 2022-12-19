import isEmpty from 'lodash/isEmpty';
import { GetServerSidePropsContext } from 'next-redux-wrapper';
import { AnyAction, Store } from 'redux';

import { setDirectories } from '../redux/ducks/directories/actionsCreators';
import {
  setFilters,
  setLoadingStatus,
  setProductsItems,
  setProductsKind,
  setTakeCount,
  setTotalCount,
} from '../redux/ducks/products/actionCreators';
import { LoadingState, RootState } from '../redux/types';
import { AdminEndpoints, Endpoints } from '../services/api/endpoints';
import { ProductsApi } from '../services/api/ProductsApi';
import { DirectoriesParams, DirectoriesResponse, ProductQueryParams, ProductsKindSearch } from '../services/types';
import { normalizeProductsParams } from './normalizers/MenuParamsNormalizer';

const ProductUrl = {
  [ProductsKindSearch.MENU]: Endpoints.PRODUCT_MENU,
  [ProductsKindSearch.RECIPE]: Endpoints.PRODUCT_RECIPES,
  [ProductsKindSearch.CHEF_TABLE]: Endpoints.PRODUCT_CHEF_TABLE,
  [ProductsKindSearch.CHEF_STORE]: Endpoints.PRODUCT_CHEF_STORE,
  [ProductsKindSearch.MASTER_CLASSES]: Endpoints.PRODUCT_MASTER_CLASSES,
  [ProductsKindSearch.ADMIN_CHEF_STORE]: AdminEndpoints.PRODUCT_STORE,
};

interface GetProductsSSRProps {
  type: ProductsKindSearch;
  ctx: GetServerSidePropsContext & {
    store: Store<RootState, AnyAction>;
  };
  directories?: DirectoriesParams;
  take?: number;
}

export const getProductsSSR = async ({
  type,
  ctx,
  directories = ['chefs', 'cuisines'],
  take = 50,
}: GetProductsSSRProps): Promise<DirectoriesResponse> => {
  const params = normalizeProductsParams(ctx.query as Record<keyof ProductQueryParams, unknown>);
  const { items, meta } = await ProductsApi.getAll(ProductUrl[type], { ...params, take });
  const allDirectories = await ProductsApi.directories(directories);

  ctx.store.dispatch(setProductsItems(items));
  ctx.store.dispatch(setTotalCount(meta.total));
  ctx.store.dispatch(setTakeCount(take));
  ctx.store.dispatch(setProductsKind(type));
  ctx.store.dispatch(setDirectories(allDirectories));

  if (!isEmpty(ctx.query)) {
    ctx.store.dispatch(setFilters({ ...params, take }));
  }

  ctx.store.dispatch(setLoadingStatus(LoadingState.LOADED));

  return allDirectories;
};
