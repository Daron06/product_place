import { FilterList, FilterListProps } from 'components/FilterList';
import { sortByItems } from 'components/pages/menu/View';
import { PriceFilter, PriceFilterProps } from 'components/PriceFilter';
import { SortBy, SortByProps } from 'components/SortBy';
import { UseProducts } from 'hooks/useProducts';
import { useTranslate } from 'hooks/useTranslate';
import { castDraft } from 'immer';
import { FiltersLayout } from 'layouts/FiltersLayout';
import React from 'react';
import { Chef, Cuisine } from 'redux/ducks/products/types/contracts';
import { ProductQueryParams, Supplier } from 'services/types';

interface ProductFiltersProps<T> {
  chefs?: Chef[];
  cuisines?: Cuisine[];
  cuisineIds?: ProductQueryParams['cuisine_ids'];
  chefIds?: ProductQueryParams['chef_ids'];
  maxPrice: ProductQueryParams['maxPrice'];
  minPrice: ProductQueryParams['minPrice'];
  onCuisineApply?: FilterListProps<T>['onApply'];
  onChefsApply?: FilterListProps<T>['onApply'];
  onSuppliersApply?: FilterListProps<T>['onApply'];
  onFilterReset: UseProducts['onFilterReset'];
  onPriceRangeApply: PriceFilterProps['onApply'];
  onSortMenu: SortByProps['onSortSelect'];
  sortValue: SortByProps['value'];
  supplierIds?: ProductQueryParams['supplier_ids'];
  suppliers?: Supplier[];
}

// TODO: Типизировать фильтрацию
export const ProductFilters: React.FC<ProductFiltersProps<any>> = ({
  chefs,
  cuisines,
  chefIds,
  cuisineIds,
  onCuisineApply,
  onChefsApply,
  onFilterReset,
  onPriceRangeApply,
  onSuppliersApply,
  onSortMenu,
  minPrice,
  maxPrice,
  sortValue,
  suppliers,
  supplierIds,
}) => {
  const { t } = useTranslate('products-filter');
  return (
    <FiltersLayout
      leftFilters={
        <>
          {cuisines && (
            <FilterList<number>
              items={cuisines.map((item) => ({ name: item.name, value: Number(item.id) }))}
              values={castDraft(cuisineIds)}
              onApply={onCuisineApply}
              onReset={(): void => onFilterReset(['cuisine_ids'])}
              label={t('cuisines')}
              placeholder={t('search-cuisine')}
              testId="cuisines-filter"
            />
          )}
          {suppliers && (
            <FilterList<number>
              items={suppliers.map((item) => ({ name: item.name, value: Number(item.id) }))}
              values={castDraft(supplierIds)}
              onApply={onSuppliersApply}
              onReset={(): void => onFilterReset(['supplier_ids'])}
              label={t('suppliers')}
              placeholder={t('search-supplier')}
              testId="suppliers-filter"
            />
          )}
          {chefs && onChefsApply && (
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
          <PriceFilter
            onApply={onPriceRangeApply}
            onReset={(): void => onFilterReset(['maxPrice', 'minPrice'])}
            range={[0, 15000]}
            value={minPrice || maxPrice ? [minPrice || 0, maxPrice || 15000] : undefined}
          />
        </>
      }
      rightFilters={<SortBy items={sortByItems} onSortSelect={onSortMenu} value={sortValue} />}
    />
  );
};
