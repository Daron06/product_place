import useProducts from 'hooks/useProducts';
import { useTranslate } from 'hooks/useTranslate';
import { castDraft } from 'immer';
import Link from 'next/link';
import React from 'react';
import { Chef } from 'redux/ducks/products/types/contracts';
import { OrderByProduct, ProductsKindSearch } from 'services/types';

import { MasterClassesList } from '../../../layouts/MasterClassesList';
import { ProductsLayout } from '../../../layouts/ProductsLayout';
import { ProductsPagination } from '../../../layouts/ProductsPagination';
import { ProductsSearch } from '../../../layouts/ProductsSearch';
import { getMasterClassType } from '../../../utils/getMasterClassType';
import { BookingFilters } from '../../BookingFilters';
import { MasterClassCardItem } from '../../MasterClassCardItem';

interface MasterClassesProps {
  chefs: Chef[] | undefined;
}

export const MasterClasses: React.FC<MasterClassesProps> = ({ chefs }): React.ReactElement => {
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
    onDurationApply,
    totalCount,
    currentPage,
    takeCount,
    queryParams,
    onMasterClassTypeApply,
    onRatingApply,
    onGuestsApply,
  } = useProducts(ProductsKindSearch.MASTER_CLASSES);

  const { t, getTranslatedText } = useTranslate('masterclasses');

  return (
    <ProductsLayout breadcrumbs={[{ title: t('home'), url: '/' }, { title: t('title') }]} pageTitle={t('title')}>
      <ProductsSearch
        onSubmitSearch={onClickSearch}
        onSearchQueryChange={onSearchQueryChange}
        placeholder={t('search-placeholder')}
      />
      <BookingFilters
        chefs={chefs}
        type={ProductsKindSearch.MASTER_CLASSES}
        chefIds={castDraft(queryParams.chef_ids)}
        onChefsApply={onChefsApply}
        onDateApply={onDateApply}
        onFilterReset={onFilterReset}
        onPriceRangeApply={onPriceRangeApply}
        onSortMenu={onSortMenu}
        onMasterClassTypeApply={onMasterClassTypeApply}
        onRatingApply={onRatingApply}
        onGuestsApply={onGuestsApply}
        minPrice={queryParams.minPrice}
        onDurationApply={onDurationApply}
        duration={castDraft(queryParams.duration)}
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
      <MasterClassesList isLoading={isLoading} isLoaded={isLoaded} itemsLength={items?.length}>
        {items?.map((item) => {
          const typeInfo = getMasterClassType(item.additionalInfo?.type);
          return (
            <Link key={item.id} href={`/master-classes/${item.slug}`}>
              <a href={`/master-classes/${item.slug}`}>
                <MasterClassCardItem
                  id={Number(item.id)}
                  imageUrl={item.media[0]?.url}
                  title={getTranslatedText(item, 'name')}
                  tooltipText={typeInfo?.label || ''}
                  icon={typeInfo?.icon || ''}
                  price={item.price}
                  rating={item.rating}
                  isFree={item.isFree}
                />
              </a>
            </Link>
          );
        })}
      </MasterClassesList>
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
