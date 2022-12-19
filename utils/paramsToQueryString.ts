import qs from 'qs';

import { queryParamsGuard } from './queryParamsGuard';

export const paramsToQueryString = (params: Record<string, unknown> = {}): string => {
  const normalizedParams = queryParamsGuard(params);
  return qs
    .stringify(normalizedParams, {
      arrayFormat: 'comma',
      encode: false,
    })
    .trim();
};
