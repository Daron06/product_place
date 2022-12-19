/* eslint-disable no-param-reassign */
import isNil from 'lodash/isNil';

import { productsQueryKeyParams } from '../redux/ducks/products/constants';
import { ProductQueryParams } from '../services/types';

export function queryParamsGuard<T>(params: Record<string, T>): Record<string, string> {
  return Object.keys(params).reduce((prev, param) => {
    const key = param as keyof ProductQueryParams;
    if (productsQueryKeyParams.includes(key as keyof ProductQueryParams)) {
      const value = params[key];

      if (Array.isArray(value)) {
        if (value.length > 0) {
          prev[key] = value;
        } else {
          return prev;
        }
      }

      if ((key === 'maxPrice' || key === 'minPrice') && Number(value) === 0) {
        return prev;
      }

      if (!value) {
        return prev;
      }

      if (!isNil(value)) {
        prev[key] = value as T;
      }
    }

    return prev;
  }, {});
}
