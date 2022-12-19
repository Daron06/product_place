import { MenuView } from 'components/pages/menu/View';
import useProducts from 'hooks/useProducts';
import React from 'react';
import { Chef, Cuisine } from 'redux/ducks/products/types/contracts';
import { OrderByProduct, ProductsKindSearch } from 'services/types';

interface MenuProps {
  chefs: Chef[] | undefined;
  cuisines: Cuisine[] | undefined;
}

export const Menu: React.FC<MenuProps> = ({ chefs, cuisines }): React.ReactElement => {
  const {
    onClickSearch,
    onPaginate,
    onSearchQueryChange,
    onPriceRangeApply,
    onCuisineApply,
    onChefsApply,
    onSortMenu,
    onFilterReset,
    items,
    isLoading,
    isLoaded,
    totalCount,
    currentPage,
    takeCount,
    queryParams,
  } = useProducts(ProductsKindSearch.MENU);

  return (
    <MenuView
      filteringData={{ chefs, cuisines }}
      sortValue={queryParams.orderBy || OrderByProduct.NAME_DESC || OrderByProduct.NAME_ASC}
      items={items}
      onChefsApply={onChefsApply}
      onCuisineApply={onCuisineApply}
      onPaginate={onPaginate}
      onFilterReset={onFilterReset}
      onPriceRangeApply={onPriceRangeApply}
      onClickSearch={onClickSearch}
      onSearchQueryChange={onSearchQueryChange}
      onSortMenu={onSortMenu}
      isLoading={isLoading}
      isLoaded={isLoaded}
      totalCount={totalCount}
      currentPage={currentPage || 1}
      takeCount={takeCount}
      queryParams={queryParams}
    />
  );
};
