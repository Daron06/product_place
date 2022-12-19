import { Skeleton } from '@material-ui/lab';
import { BookingFilters } from 'components/BookingFilters';
import { MasterClassCardItem } from 'components/MasterClassCardItem';
import useProducts from 'hooks/useProducts';
import { useTranslate } from 'hooks/useTranslate';
import { castDraft } from 'immer';
import { MasterClassesList } from 'layouts/MasterClassesList';
import { ProductsPagination } from 'layouts/ProductsPagination';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setProductsKind } from 'redux/ducks/products/actionCreators';
import { OrderByProduct, ProductsKindSearch } from 'services/types';
import { getMasterClassType } from 'utils/getMasterClassType';

interface MasterClassesTabProps {
  kind: ProductsKindSearch;
  pathToItemDetails: 'master-classes';
  chefId?: number;
}

export const MasterClassesTab: React.FC<MasterClassesTabProps> = ({ kind, pathToItemDetails, chefId }) => {
  const dispatch = useDispatch();
  const { getTranslatedText } = useTranslate();
  React.useEffect(() => {
    dispatch(setProductsKind(kind));
  }, []);

  const {
    onPaginate,
    onPriceRangeApply,
    onSortMenu,
    onDateApply,
    onFilterReset,
    items,
    isLoading,
    onRatingApply,
    onMasterClassTypeApply,
    isLoaded,
    onDurationApply,
    totalCount,
    onGuestsApply,
    currentPage,
    takeCount,
    queryParams,
  } = useProducts(kind, { chef_ids: chefId ? [chefId] : undefined });

  return (
    <>
      {isLoading ? (
        <div className="d-flex mb-30 mt-0">
          <Skeleton className="mr-10" height="50px" width="51px" />
          <Skeleton height="50px" width="59px" />
          <Skeleton className="ml-10 mr-10" height="50px" width="59px" />
          <Skeleton className="mr-10" height="50px" width="59px" />
          <Skeleton className="mr-10" height="50px" width="59px" />
          <Skeleton className="mr-10" height="50px" width="59px" />
        </div>
      ) : (
        <BookingFilters
          type={ProductsKindSearch.MASTER_CLASSES}
          chefIds={castDraft(queryParams.chef_ids)}
          onDateApply={onDateApply}
          onFilterReset={onFilterReset}
          onPriceRangeApply={onPriceRangeApply}
          onDurationApply={onDurationApply}
          duration={castDraft(queryParams.duration)}
          onSortMenu={onSortMenu}
          onMasterClassTypeApply={onMasterClassTypeApply}
          onRatingApply={onRatingApply}
          onGuestsApply={onGuestsApply}
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
      )}
      <MasterClassesList isLoading={isLoading} isLoaded={isLoaded} itemsLength={items?.length}>
        {items?.map((item) => {
          const typeInfo = getMasterClassType(item.additionalInfo?.type);
          return (
            <Link key={item.id} href={`/${pathToItemDetails}/${item.slug}`}>
              <a href={`/${pathToItemDetails}/${item.slug}`}>
                <MasterClassCardItem
                  tooltipText={typeInfo?.label || ''}
                  icon={typeInfo?.icon || ''}
                  imageUrl={item.media[0]?.url}
                  title={getTranslatedText(item, 'name')}
                  price={item.price}
                  rating={item.rating}
                  id={Number(item.id)}
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
          takeCount={takeCount}
          totalCount={totalCount}
          onPaginate={onPaginate}
        />
      )}
    </>
  );
};
