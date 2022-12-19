import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { ProductCategoriesList } from 'components/AddCartButtons/ProductCategoriesList';
import { BookingFilters } from 'components/BookingFilters';
import { CardItem } from 'components/CardItem';
import { ProductCard } from 'components/ProductCard';
import { ProductFilters } from 'components/ProductFilters';
import { useDirectories } from 'hooks/useDirectories';
import { useFavorite } from 'hooks/useFavorite';
import useProducts from 'hooks/useProducts';
import { useTranslate } from 'hooks/useTranslate';
import { castDraft } from 'immer';
import { CardsList } from 'layouts/CardsList';
import { ProductsPagination } from 'layouts/ProductsPagination';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ProductType } from 'redux/ducks/favorites/types/contracts';
import { OrderByProduct, ProductsKindSearch } from 'services/types';

import { setProductsKind } from '../../../../redux/ducks/products/actionCreators';

interface ProductsTabProps {
  kind: ProductsKindSearch;
  pathToItemDetails: 'chefs-table' | 'menu' | 'recipes' | 'chefs-store' | 'master-class';
  chefId?: number;
  favoriteType: ProductType;
}

export const ProductsTab: React.FC<ProductsTabProps> = ({ kind, pathToItemDetails, chefId, favoriteType }) => {
  const dispatch = useDispatch();
  const { getTranslatedText } = useTranslate();
  React.useEffect(() => {
    dispatch(setProductsKind(kind));
  }, []);

  const { cuisines, categories, suppliers } = useDirectories({ directories: ['cuisines', 'categories', 'suppliers'] });
  const { hasFavorite, toggleFavorite } = useFavorite(favoriteType);
  const {
    onPaginate,
    onCategoryToggle,
    onPriceRangeApply,
    onCuisineApply,
    onSortMenu,
    onFilterReset,
    onDurationApply,
    items,
    onSuppliersApply,
    isLoading,
    isLoaded,
    totalCount,
    currentPage,
    onMasterClassTypeApply,
    takeCount,
    onRatingApply,
    onGuestsApply,
    onDateApply,
    queryParams,
  } = useProducts(kind, { chef_ids: chefId ? [chefId] : undefined, take: 10 });

  return (
    <>
      {isLoading && pathToItemDetails === 'chefs-table' && (
        <div className="d-flex mb-30 mt-0">
          <Skeleton className="ml-10 mr-10" height="50px" width="81px" />
          <Skeleton className="mr-10" height="50px" width="81px" />
          <Skeleton className="mr-10" height="50px" width="81px" />
          <Skeleton className="mr-10" height="50px" width="81px" />
        </div>
      )}
      {categories && pathToItemDetails === 'chefs-store' && (
        <ProductCategoriesList items={categories} onCategorySelect={onCategoryToggle} />
      )}
      {pathToItemDetails !== 'chefs-table'
        ? !isLoading && (
            <ProductFilters
              suppliers={pathToItemDetails === 'chefs-store' ? castDraft(suppliers) ?? undefined : undefined}
              onSuppliersApply={pathToItemDetails === 'chefs-store' ? onSuppliersApply ?? undefined : undefined}
              supplierIds={castDraft(queryParams.supplier_ids)}
              cuisines={pathToItemDetails !== 'chefs-store' ? castDraft(cuisines) : undefined}
              cuisineIds={pathToItemDetails !== 'chefs-store' ? castDraft(queryParams.cuisine_ids) : undefined}
              onCuisineApply={pathToItemDetails !== 'chefs-store' ? onCuisineApply : undefined}
              onFilterReset={onFilterReset}
              onPriceRangeApply={onPriceRangeApply}
              onSortMenu={onSortMenu}
              minPrice={queryParams.minPrice}
              maxPrice={queryParams.maxPrice}
              sortValue={queryParams.orderBy || OrderByProduct.NAME_DESC || OrderByProduct.NAME_ASC}
            />
          )
        : !isLoading && (
            <BookingFilters
              type={ProductsKindSearch.CHEF_TABLE}
              chefIds={castDraft(queryParams.chef_ids)}
              onDateApply={onDateApply}
              onFilterReset={onFilterReset}
              onPriceRangeApply={onPriceRangeApply}
              onSortMenu={onSortMenu}
              onMasterClassTypeApply={onMasterClassTypeApply}
              onRatingApply={onRatingApply}
              onGuestsApply={onGuestsApply}
              onDurationApply={onDurationApply}
              minPrice={queryParams.minPrice}
              maxPrice={queryParams.maxPrice}
              sortValue={queryParams.orderBy || OrderByProduct.NAME_DESC || OrderByProduct.NAME_ASC}
              people={queryParams.people}
              duration={castDraft(queryParams.duration)}
              types={castDraft(queryParams.type)}
              dateRange={
                queryParams.dateFrom && queryParams.dateTo
                  ? { start: new Date(queryParams.dateFrom), end: new Date(queryParams.dateTo) }
                  : undefined
              }
            />
          )}

      <CardsList isLoading={isLoading} isLoaded={isLoaded} itemsLength={items?.length}>
        {items?.map((item) => (
          <Link key={item.id} href={`/${pathToItemDetails}/${item.slug}`}>
            <a href={`/${pathToItemDetails}/${item.slug}`}>
              {pathToItemDetails === 'chefs-table' ? (
                <CardItem
                  id={Number(item.id)}
                  type={item.type}
                  onClickFavorite={(): void => toggleFavorite(Number(item.id))}
                  favorite={hasFavorite(Number(item.id))}
                  description={getTranslatedText(item, 'description')}
                  name={getTranslatedText(item, 'name')}
                  rating={item.rating}
                  imageUrl={item.media[0]?.url}
                  tags={[`${item?.additionalInfo?.countOfPeople} seats`, `${item?.additionalInfo?.duration} min`]}
                  icon={item?.additionalInfo?.type === 'at-home' ? 'table-green' : 'table-yellow'}
                  tooltipText={
                    <Typography variant="subtitle2">
                      {item?.additionalInfo?.type === 'at-home' ? 'Customer home' : 'Chef location'}
                    </Typography>
                  }
                />
              ) : (
                <ProductCard
                  id={Number(item.id)}
                  description={
                    pathToItemDetails === 'chefs-store'
                      ? getTranslatedText(item, 'shortDescription') || ''
                      : getTranslatedText(item, 'description')
                  }
                  name={getTranslatedText(item, 'name')}
                  imageUrl={item.media[0]?.url}
                  price={item.price}
                  rating={item.rating}
                  tags={item?.cuisine?.name ? [item?.cuisine?.name] : []}
                  onClickFavorite={(): void => toggleFavorite(Number(item.id))}
                  favorite={hasFavorite(Number(item.id))}
                  type={item?.type}
                  slug={item.slug}
                  isHome
                />
              )}
            </a>
          </Link>
        ))}
      </CardsList>
      {!!items?.length && (
        <ProductsPagination
          currentCount={items.length}
          currentPage={currentPage || 1}
          takeCount={takeCount}
          totalCount={totalCount}
          onPaginate={onPaginate}
        />
      )}
    </>
  );
};
