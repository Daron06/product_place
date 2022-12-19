import { FilterList, FilterListProps } from 'components/FilterList';
import { FilterListItem } from 'components/MainSearch/FilterItem';
import { countOfPeoplesTemp } from 'components/pages/admin/staff/chef-table/constants';
import { sortByItems } from 'components/pages/menu/View';
import { PriceFilter, PriceFilterProps } from 'components/PriceFilter';
import { SortBy, SortByProps } from 'components/SortBy';
import format from 'date-fns/format';
import { UseProducts } from 'hooks/useProducts';
import { useTranslate } from 'hooks/useTranslate';
import { castDraft } from 'immer';
import { FiltersLayout } from 'layouts/FiltersLayout';
import React from 'react';
import { Chef } from 'redux/ducks/products/types/contracts';
import { ProductQueryParams, ProductsKindSearch } from 'services/types';

import { DateIntervals } from './Calendar';
import { DateFilter } from './DateFilter';
import { durationsArray } from './MainSearch';
import { RatingFilter } from './RatingFilter';

interface BookingFiltersProps {
  dateRange?: DateIntervals;
  chefs?: Chef[];
  chefIds?: ProductQueryParams['chef_ids'];
  people?: Readonly<ProductQueryParams['people']>;
  types?: ProductQueryParams['types'];
  maxPrice: ProductQueryParams['maxPrice'];
  minPrice: ProductQueryParams['minPrice'];
  onChefsApply?: FilterListProps<number | string>['onApply'];
  onFilterReset: UseProducts['onFilterReset'];
  onGuestsApply: UseProducts['onGuestsApply'];
  onDurationApply?: UseProducts['onDurationApply'];
  onMasterClassTypeApply: UseProducts['onMasterClassTypeApply'];
  onRatingApply: UseProducts['onRatingApply'];
  onPriceRangeApply: PriceFilterProps['onApply'];
  onSortMenu: SortByProps['onSortSelect'];
  onDateApply?: (date: DateIntervals) => void;
  sortValue: SortByProps['value'];
  type: ProductsKindSearch.MASTER_CLASSES | ProductsKindSearch.CHEF_TABLE;
  duration?: ProductQueryParams['duration'];
}

export const BookingFilters: React.FC<BookingFiltersProps> = ({
  chefs,
  chefIds,
  onChefsApply,
  onFilterReset,
  onPriceRangeApply,
  onDateApply,
  onMasterClassTypeApply,
  onRatingApply,
  onGuestsApply,
  onDurationApply,
  onSortMenu,
  minPrice,
  maxPrice,
  sortValue,
  dateRange,
  people,
  types,
  type = ProductsKindSearch.CHEF_TABLE,
  duration,
}): React.ReactElement => {
  const guestsArray = type === 'masterClasses' ? countOfPeoplesTemp.masterClass.online : countOfPeoplesTemp.chefTable;
  const { t } = useTranslate('booking-filters');
  return (
    <FiltersLayout
      leftFilters={
        <>
          <DateFilter<DateIntervals>
            mode="range"
            minDate={new Date()}
            onReset={(): void => onFilterReset(['dateTo', 'dateFrom'])}
            onApply={onDateApply}
            value={dateRange}
            label={
              dateRange
                ? `${format(new Date(dateRange.start), 'MMM dd')} - ${format(new Date(dateRange.end), 'MMM dd')}`
                : t('day')
            }
          />
          {chefs && (
            <FilterList<number>
              items={chefs.map((item) => ({ name: item.name, value: Number(item.id) }))}
              values={castDraft(chefIds)}
              onApply={onChefsApply}
              onReset={(): void => onFilterReset(['chef_ids'])}
              label={t('chefs')}
              placeholder={t('search-chef')}
              testId="chefs-filter"
            />
          )}
          <FilterList
            items={guestsArray.map((item) => ({ name: item.name, value: Number(item.id) }))}
            label={type === 'masterClasses' ? t('guests') : t('seats')}
            onApply={(ids): void => onGuestsApply?.(ids)}
            onReset={(): void => onFilterReset(['people'])}
            values={castDraft(people)}
          />
          {(type === ProductsKindSearch.CHEF_TABLE || type === ProductsKindSearch.MASTER_CLASSES) && (
            <FilterList<number>
              items={durationsArray.map((item): FilterListItem => ({ name: item.name, value: Number(item.id) }))}
              label={t('duration')}
              onApply={(ids): void => onDurationApply?.(ids)}
              onReset={(): void => onFilterReset(['duration'])}
              values={duration}
            />
          )}
          <RatingFilter onApply={onRatingApply} onReset={(): void => onFilterReset(['rating'])} label={t('rating')} />
          <PriceFilter
            onApply={onPriceRangeApply}
            onReset={(): void => onFilterReset(['maxPrice', 'minPrice'])}
            range={[0, 15000]}
            value={minPrice || maxPrice ? [minPrice || 0, maxPrice || 15000] : undefined}
          />
          <FilterList
            items={
              type === ProductsKindSearch.CHEF_TABLE
                ? [
                    {
                      name: t('at-home'),
                      value: 'at-home',
                    },
                    {
                      name: t('at-restaurant'),
                      value: 'at-restaurant',
                    },
                  ]
                : [
                    {
                      name: t('online'),
                      value: 'online',
                    },
                    {
                      name: t('offline'),
                      value: 'offline',
                    },
                    {
                      name: t('recorded'),
                      value: 'recorded',
                    },
                  ]
            }
            onApply={onMasterClassTypeApply}
            onReset={(): void => onFilterReset(['type'])}
            label={t('type')}
            searchable={false}
            values={types}
          />
        </>
      }
      rightFilters={<SortBy items={sortByItems} onSortSelect={onSortMenu} value={sortValue} />}
    />
  );
};
