import useProducts from 'hooks/useProducts';
import { useTranslate } from 'hooks/useTranslate';
import { castDraft } from 'immer';
import Link from 'next/link';
import React from 'react';
import { Chef, Cuisine } from 'redux/ducks/products/types/contracts';
import { OrderByProduct, ProductsKindSearch } from 'services/types';

import { useFavorite } from '../../../hooks/useFavorite';
import { CardsList } from '../../../layouts/CardsList';
import { ProductsLayout } from '../../../layouts/ProductsLayout';
import { ProductsPagination } from '../../../layouts/ProductsPagination';
import { ProductsSearch } from '../../../layouts/ProductsSearch';
import { ProductCard } from '../../ProductCard';
import { ProductFilters } from '../../ProductFilters';

interface ProductsProps {
  chefs: Chef[] | undefined;
  cuisines: Cuisine[] | undefined;
}

export const Recipes: React.FC<ProductsProps> = ({ chefs, cuisines }): React.ReactElement => {
  const { hasFavorite, toggleFavorite } = useFavorite(ProductsKindSearch.RECIPE);
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
  } = useProducts(ProductsKindSearch.RECIPE);

  const { t, getTranslatedText } = useTranslate('recipes');

  return (
    <ProductsLayout pageTitle={t('title')} breadcrumbs={[{ title: t('home'), url: '/' }, { title: t('title') }]}>
      <ProductsSearch
        onSubmitSearch={onClickSearch}
        onSearchQueryChange={onSearchQueryChange}
        placeholder={t('search-placeholder')}
        value={queryParams.query}
      />
      <ProductFilters
        chefs={chefs}
        cuisines={cuisines}
        cuisineIds={castDraft(queryParams.cuisine_ids)}
        chefIds={castDraft(queryParams.chef_ids)}
        onCuisineApply={onCuisineApply}
        onChefsApply={onChefsApply}
        onFilterReset={onFilterReset}
        onPriceRangeApply={onPriceRangeApply}
        onSortMenu={onSortMenu}
        minPrice={queryParams.minPrice}
        maxPrice={queryParams.maxPrice}
        sortValue={queryParams.orderBy || OrderByProduct.NAME_DESC || OrderByProduct.NAME_ASC}
      />
      <CardsList isLoading={isLoading} isLoaded={isLoaded} itemsLength={items?.length}>
        {items?.map((item) => (
          <Link key={item.id} href={`recipes/${item.slug}`}>
            <a href={`recipes/${item.slug}`}>
              <ProductCard
                type={item.type}
                onClickFavorite={(): void => toggleFavorite(Number(item.id))}
                favorite={hasFavorite(Number(item.id))}
                id={Number(item.id)}
                name={getTranslatedText(item, 'name')}
                description={getTranslatedText(item, 'description')}
                imageUrl={item.media[0]?.url}
                price={item.price}
                rating={item.rating}
                size="large"
                tags={item.cuisine?.name ? [item.cuisine.name] : []}
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
