import usePrevious from 'ahooks/lib/usePrevious';
import { Immutable } from 'immer';
import omit from 'lodash/omit';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setChefsSearchQuery } from 'redux/ducks/chefs/actionCreators';
import { ChefsQueryParams, ProductQueryParams } from 'services/types';
import { paramsToQueryString } from 'utils/paramsToQueryString';

type UseQueryParams = Immutable<ProductQueryParams | ChefsQueryParams>;

export default function useProductsQueryParams(queryParams: UseQueryParams, isChefsPage?: boolean): UseQueryParams {
  const router = useRouter();
  const dispatch = useDispatch();

  const prevPathname = usePrevious(router.pathname);

  React.useEffect(() => {
    if (router.pathname === prevPathname && !router.pathname.includes('/chefs/')) {
      const normalizedParams = omit(queryParams, ['take', queryParams.page === 1 ? 'page' : '']);
      const filtersQuery = paramsToQueryString(normalizedParams);
      router.push({ pathname: router.pathname, query: filtersQuery }, undefined, {
        shallow: true,
      });
      if (queryParams.query && isChefsPage) {
        dispatch(setChefsSearchQuery(queryParams.query));
      }
    }
  }, [queryParams, prevPathname]);

  return router.query;
}
