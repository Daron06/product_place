import useProductsQueryParams from 'hooks/useProductsQueryParams';
import { useTranslate } from 'hooks/useTranslate';
import { castDraft } from 'immer';
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchChefs,
  removeChefsFilter,
  setChefsFilters,
  setChefsPageNumber,
  setChefsSearchQuery,
  setChefsType,
} from 'redux/ducks/chefs/actionCreators';
import {
  selectChefsCurrentPage,
  selectChefsItems,
  selectChefsLoading,
  selectChefsQueryParams,
  selectChefsTakeCount,
  selectChefsTotalCount,
} from 'redux/ducks/chefs/selectors';
import { ChefHas, ChefsQueryParams } from 'services/types';

import { ChefsView } from './View';

export const chefsIncludeItems: Array<{ name: string; value: ChefHas }> = [
  {
    name: 'Delivery Menu',
    value: 'menu',
  },
  {
    name: 'Recipe Boxes',
    value: 'recipe',
  },
  {
    name: 'Chef’s Store',
    value: 'chefStore',
  },
  {
    name: 'Chef’s Tables',
    value: 'chefTable',
  },
  {
    name: 'Masterclasses',
    value: 'masterClass',
  },
];

export const Chefs: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const items = useSelector(selectChefsItems);
  const isLoading = useSelector(selectChefsLoading);
  const queryParams = useSelector(selectChefsQueryParams);
  const currentPage = useSelector(selectChefsCurrentPage);
  const totalCount = useSelector(selectChefsTotalCount);
  const takeCount = useSelector(selectChefsTakeCount);
  const routerQuery = useProductsQueryParams(queryParams, true);

  React.useEffect(() => {
    if (!isEmpty(routerQuery)) {
      dispatch(setChefsFilters(routerQuery as ChefsQueryParams));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!items) {
    return <div>There are no chefs</div>;
  }

  const handleSearchQuerySubmit = (): void => {
    dispatch(fetchChefs());
  };

  const handleSearchQueryChange = (value: string): void => {
    dispatch(setChefsSearchQuery(value));
  };

  const handleChefsIncludeApply = (values: ChefHas[]): void => {
    dispatch(setChefsType(values));
  };

  const handleChefsIncludeReset = (keys: Array<keyof ChefsQueryParams>): void => {
    dispatch(removeChefsFilter(keys));
  };

  const handleChefsChangePageNumber = (page: number): void => {
    dispatch(setChefsPageNumber(page));
  };

  const prepareChefTypes = (types?: string | ChefHas[]): ChefHas[] | undefined => {
    if (Array.isArray(types)) {
      return types;
    }

    return types !== undefined ? (types?.split(',') as ChefHas[]) : undefined;
  };
  const { t } = useTranslate('chefs');
  const chefItems = chefsIncludeItems.map((item) => ({
    name: t(item.value),
    value: item.value,
  }));
  return (
    <ChefsView
      currentPage={currentPage || 1}
      chefsIncludeItems={chefItems}
      chefTypesFilterValue={prepareChefTypes(routerQuery?.types as string)}
      items={castDraft(items)}
      isLoading={isLoading}
      onChefsIncludedApply={handleChefsIncludeApply}
      onChefsIncludedReset={handleChefsIncludeReset}
      onPaginate={handleChefsChangePageNumber}
      onSubmitSearch={handleSearchQuerySubmit}
      onSearchQueryChange={handleSearchQueryChange}
      searchValue={routerQuery.query as string}
      totalCount={totalCount}
      takeCount={takeCount}
    />
  );
};
