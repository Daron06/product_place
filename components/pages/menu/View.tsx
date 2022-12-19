import { ProductCard } from 'components/ProductCard';
import { useFavorite } from 'hooks/useFavorite';
import { UseProducts } from 'hooks/useProducts';
import { useTranslate } from 'hooks/useTranslate';
import { castDraft } from 'immer';
import { CardsList } from 'layouts/CardsList';
import { ProductsLayout } from 'layouts/ProductsLayout';
import { ProductsPagination } from 'layouts/ProductsPagination';
import { ProductsSearch } from 'layouts/ProductsSearch';
import Link from 'next/link';
import React from 'react';
import { Chef, Cuisine } from 'redux/ducks/products/types/contracts';
import { OrderByProduct } from 'services/types';

import { ProductFilters } from '../../ProductFilters';

export const sortByItems: OrderByProduct[] = [
  OrderByProduct.NAME_ASC,
  OrderByProduct.NAME_DESC,
  OrderByProduct.PRICE_ASC,
  OrderByProduct.PRICE_DESC,
];

interface MenuViewProps extends Omit<UseProducts, 'fetchAllProducts'> {
  filteringData: {
    chefs: Chef[] | undefined;
    cuisines: Cuisine[] | undefined;
  };
  sortValue: OrderByProduct;
}

export const MenuView: React.FC<MenuViewProps> = ({
  filteringData,
  onClickSearch,
  onSearchQueryChange,
  onPriceRangeApply,
  onChefsApply,
  onCuisineApply,
  onSortMenu,
  onPaginate,
  onFilterReset,
  sortValue,
  items,
  isLoading = true,
  isLoaded,
  totalCount,
  currentPage,
  takeCount,
  queryParams,
}): React.ReactElement => {
  const { hasFavorite, toggleFavorite } = useFavorite('menu');

  const onClickFavorite = React.useCallback(function onClickFavorite(id: number) {
    toggleFavorite(id);
  }, []);

  const { t } = useTranslate('menu');

  return (
    <ProductsLayout pageTitle={t('title')} breadcrumbs={[{ title: t('home'), url: '/' }, { title: t('title') }]}>
      <ProductsSearch
        placeholder={t('search-placeholder')}
        onSubmitSearch={onClickSearch}
        onSearchQueryChange={onSearchQueryChange}
        value={queryParams.query}
      />
      <ProductFilters
        chefs={filteringData.chefs}
        cuisines={filteringData.cuisines}
        cuisineIds={castDraft(queryParams.cuisine_ids)}
        chefIds={castDraft(queryParams.chef_ids)}
        onCuisineApply={onCuisineApply}
        onChefsApply={onChefsApply}
        onFilterReset={onFilterReset}
        onPriceRangeApply={onPriceRangeApply}
        onSortMenu={onSortMenu}
        minPrice={queryParams.minPrice}
        maxPrice={queryParams.maxPrice}
        sortValue={sortValue}
      />
      <CardsList isLoading={isLoading} isLoaded={isLoaded} itemsLength={items?.length}>
        {items?.map((item) => (
          <Link key={item.id} href={`menu/${item.slug}`}>
            <a href={`menu/${item.slug}`}>
              <ProductCard
                type={item.type}
                id={Number(item.id)}
                description={item.description}
                name={item.name}
                imageUrl={item.media[0]?.url}
                price={item.price}
                rating={item.rating}
                size="large"
                cuisine={item.cuisine?.name}
                onClickFavorite={onClickFavorite}
                favorite={hasFavorite(Number(item.id))}
                slug={item.slug}
              />
            </a>
          </Link>
        ))}
      </CardsList>
      {!!items?.length && (
        <ProductsPagination
          currentCount={items.length}
          currentPage={currentPage || 1}
          loading={isLoading}
          takeCount={takeCount}
          totalCount={totalCount}
          onPaginate={onPaginate}
        />
      )}
    </ProductsLayout>
  );
};
