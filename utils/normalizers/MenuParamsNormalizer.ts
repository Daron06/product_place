import { OrderByProduct, ProductQueryParams } from 'services/types';

import { queryParamsGuard } from '../queryParamsGuard';
import { toArrayOf } from '../toArrayOf';

export const normalizeProductsParams = (
  query: Partial<Record<keyof ProductQueryParams, unknown>>,
): ProductQueryParams => {
  const params = queryParamsGuard(query);
  const chefIds = toArrayOf(params.chef_ids);
  const cuisineIds = toArrayOf(params.cuisine_ids);
  const suppliersIds = toArrayOf(params.supplier_ids);
  const duration = toArrayOf(params.duration);
  const people = toArrayOf(params.people);
  const categoryIds = params.category_ids ? toArrayOf(params.category_ids) : null;

  const obj = {
    chef_ids: chefIds,
    cuisine_ids: cuisineIds,
    supplier_ids: suppliersIds,
    category_ids: categoryIds,
    duration,
    people,
    orderBy: [
      OrderByProduct.NAME_ASC,
      OrderByProduct.NAME_DESC,
      OrderByProduct.PRICE_ASC,
      OrderByProduct.PRICE_DESC,
    ].includes(params.orderBy as OrderByProduct)
      ? (params.orderBy as OrderByProduct)
      : undefined,
    type: params.type ? toArrayOf(params.type) : undefined,
    page: params.page ? Number(params.page) : undefined,
    take: params.take ? Number(params.take) : undefined,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    query: params.query ? String(params.query) : undefined,
    dateFrom: params.dateFrom,
    dateTo: params.dateTo,
  };

  return Object.entries(obj).reduce((prev, [key, value]) => {
    if (Array.isArray(value) && !value.length) {
      return prev;
    }
    if (value) {
      // eslint-disable-next-line no-param-reassign
      prev[key] = value;
    }
    return prev;
  }, {});
};
