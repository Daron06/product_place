import { FilterList, FilterListProps } from 'components/FilterList';
import { useFavorite } from 'hooks/useFavorite';
import { useTranslate } from 'hooks/useTranslate';
import { ChefsList } from 'layouts/ChefsList';
import { FiltersLayout } from 'layouts/FiltersLayout';
import { ProductsLayout } from 'layouts/ProductsLayout';
import { ProductsPagination } from 'layouts/ProductsPagination';
import { ProductsSearch, ProductsSearchProps } from 'layouts/ProductsSearch';
import Link from 'next/link';
import React from 'react';
import { Chef } from 'redux/ducks/products/types/contracts';
import { ChefHas, ChefsQueryParams } from 'services/types';

import { CardItem } from '../../CardItem';
import styles from './Chefs.module.scss';

interface ChefsViewProps {
  chefsIncludeItems: Array<{ name: string; value: ChefHas }>;
  chefTypesFilterValue?: ChefHas[];
  currentPage: number;
  items: Chef[];
  isLoading: boolean;
  onChefsIncludedApply: FilterListProps<ChefHas>['onApply'];
  onChefsIncludedReset: (keys: Array<keyof ChefsQueryParams>) => void;
  onPaginate: (number: number) => void;
  onSubmitSearch: ProductsSearchProps['onSubmitSearch'];
  onSearchQueryChange: ProductsSearchProps['onSearchQueryChange'];
  searchValue?: string;
  totalCount: number;
  takeCount: number;
}

export const ChefsView: React.FC<ChefsViewProps> = ({
  chefsIncludeItems,
  chefTypesFilterValue,
  currentPage,
  items,
  isLoading,
  onChefsIncludedApply,
  onChefsIncludedReset,
  onPaginate,
  onSubmitSearch,
  onSearchQueryChange,
  searchValue,
  totalCount,
  takeCount,
}): React.ReactElement => {
  const { hasFavorite, toggleFavorite } = useFavorite('chef');
  const { t } = useTranslate('chefs');

  return (
    <ProductsLayout breadcrumbs={[{ title: t('home'), url: '/' }, { title: t('title') }]} pageTitle={t('title')}>
      <ProductsSearch
        onSearchQueryChange={onSearchQueryChange}
        onSubmitSearch={onSubmitSearch}
        value={searchValue}
        placeholder={t('search-placeholder')}
      />
      <FiltersLayout
        leftFilters={
          <FilterList<ChefHas>
            values={chefTypesFilterValue}
            items={chefsIncludeItems}
            onApply={onChefsIncludedApply}
            onReset={(): void => onChefsIncludedReset(['types'])}
            label={t('included')}
            testId="included-filter"
          />
        }
      />
      <ChefsList isLoading={isLoading} itemsLength={items.length}>
        {items.map((item) => (
          <div key={item.id} className={styles.chefItem}>
            <Link href={`/chefs/${item.slug}`}>
              <a href={`/chefs/${item.slug}`}>
                <CardItem
                  id={Number(item.id)}
                  description={item.description}
                  imageUrl={item.image}
                  name={item.name}
                  onClickFavorite={toggleFavorite}
                  favorite={hasFavorite(Number(item.id))}
                  type="chef"
                  isBlog
                />
              </a>
            </Link>
          </div>
        ))}
      </ChefsList>
      {!!items?.length && totalCount > takeCount && (
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
