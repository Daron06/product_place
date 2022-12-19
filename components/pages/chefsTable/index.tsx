import { Typography } from '@material-ui/core';
import useProducts from 'hooks/useProducts';
import { useTranslate } from 'hooks/useTranslate';
import { castDraft } from 'immer';
import Link from 'next/link';
import React from 'react';
import { Chef } from 'redux/ducks/products/types/contracts';
import { OrderByProduct, ProductsKindSearch } from 'services/types';

import { useFavorite } from '../../../hooks/useFavorite';
import { CardsList } from '../../../layouts/CardsList';
import { ProductsLayout } from '../../../layouts/ProductsLayout';
import { ProductsPagination } from '../../../layouts/ProductsPagination';
import { ProductsSearch } from '../../../layouts/ProductsSearch';
import { BookingFilters } from '../../BookingFilters';
import { CardItem } from '../../CardItem';

interface ChefsTableProps {
  chefs: Chef[] | undefined;
}

export const ChefsTable: React.FC<ChefsTableProps> = ({ chefs }): React.ReactElement => {
  const {
    onClickSearch,
    onPaginate,
    onSearchQueryChange,
    onPriceRangeApply,
    onChefsApply,
    onSortMenu,
    onDateApply,
    onFilterReset,
    items,
    isLoading,
    isLoaded,
    totalCount,
    currentPage,
    takeCount,
    queryParams,
    onMasterClassTypeApply,
    onRatingApply,
    onGuestsApply,
    onDurationApply,
  } = useProducts(ProductsKindSearch.CHEF_TABLE);

  const { hasFavorite, toggleFavorite } = useFavorite('chefTable');
  const { t, getTranslatedText } = useTranslate('chefs-table');

  return (
    <ProductsLayout breadcrumbs={[{ title: t('home'), url: '/' }, { title: t('title') }]} pageTitle={t('title')}>
      <ProductsSearch
        onSubmitSearch={onClickSearch}
        onSearchQueryChange={onSearchQueryChange}
        placeholder={t('search-placeholder')}
      />
      <BookingFilters
        chefs={chefs}
        type={ProductsKindSearch.CHEF_TABLE}
        chefIds={castDraft(queryParams.chef_ids)}
        onChefsApply={onChefsApply}
        onDateApply={onDateApply}
        onFilterReset={onFilterReset}
        onPriceRangeApply={onPriceRangeApply}
        onSortMenu={onSortMenu}
        onMasterClassTypeApply={onMasterClassTypeApply}
        onRatingApply={onRatingApply}
        onGuestsApply={onGuestsApply}
        onDurationApply={onDurationApply}
        duration={castDraft(queryParams.duration)}
        minPrice={queryParams.minPrice}
        maxPrice={queryParams.maxPrice}
        sortValue={queryParams.orderBy || OrderByProduct.NAME_DESC || OrderByProduct.NAME_ASC}
        people={queryParams.people}
        types={castDraft(queryParams.type)}
        dateRange={
          queryParams.dateFrom && queryParams.dateTo
            ? { start: new Date(queryParams.dateFrom), end: new Date(queryParams.dateTo) }
            : undefined
        }
      />
      <CardsList isLoading={isLoading} isLoaded={isLoaded} itemsLength={items?.length}>
        {items?.map((item) => (
          <Link key={item.id} href={`/chefs-table/${item.slug}`}>
            <a href={`/chefs-table/${item.slug}`}>
              <CardItem
                id={Number(item.id)}
                type={item.type}
                onClickFavorite={(): void => toggleFavorite(Number(item.id))}
                favorite={hasFavorite(Number(item.id))}
                name={getTranslatedText(item, 'name')}
                description={getTranslatedText(item, 'description')}
                rating={item.rating}
                imageUrl={item.media[0].url}
                tags={[`${item?.additionalInfo?.countOfPeople} seats`, `${item?.additionalInfo?.duration} min`]}
                icon={item?.additionalInfo?.type === 'at-home' ? 'table-green' : 'table-yellow'}
                tooltipText={
                  <div className="d-flex align-items-center">
                    <Typography variant="subtitle2">
                      <b>Chef Table</b>
                    </Typography>
                    &nbsp;
                    <Typography variant="subtitle2">
                      {item?.additionalInfo?.type === 'at-home' ? 'at your home' : 'at restaurant'}
                    </Typography>
                  </div>
                }
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
