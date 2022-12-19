import clsx from 'clsx';
import { BreadcrumbsItems } from 'components/Breadcrumbs';
import { useFavorite } from 'hooks/useFavorite';
import { useTranslate } from 'hooks/useTranslate';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { useIsLoading } from '../../hooks/useIsLoading';
import useProductsQueryParams from '../../hooks/useProductsQueryParams';
import { CardsList } from '../../layouts/CardsList';
import styles from '../../layouts/FiltersLayout/FiltersLayout.module.scss';
import { ProductsLayout } from '../../layouts/ProductsLayout';
import { ProductsPagination } from '../../layouts/ProductsPagination';
import { Product } from '../../redux/ducks/products/types/contracts';
import { ProductsApi, ProductsUrl } from '../../services/api/ProductsApi';
import {
  DirectoriesResponse,
  OrderByProduct,
  ProductQueryParams,
  ProductsKindSearch,
  ResponseWithMeta,
} from '../../services/types';
import { ProductCategoriesList } from '../AddCartButtons/ProductCategoriesList';
import { sortByItems } from '../pages/menu/View';
import { PriceFilter } from '../PriceFilter';
import { ProductCard } from '../ProductCard';
import { FiltersListAsync } from '../ProductFilters/filters/FiltersListAsync';
import { Search } from '../Search';
import { SortBy } from '../SortBy';

type AvailableFilters = 'suppliers' | 'chefs' | 'cuisines' | 'price' | 'query' | 'categories';
type QueryProductsParams = Partial<
  Omit<ProductQueryParams, 'cuisine_ids' | 'chef_ids'> & { cuisine_ids: string; chef_ids: string }
>;

export type LayoutStyles = React.CSSProperties & { container?: boolean };

interface ProductsProps {
  title: string;
  categoryTitle?: string;
  breadcrumbs?: BreadcrumbsItems[];
  filters?: Array<AvailableFilters>;
  items: Product[];
  currentPage?: number;
  takeCount?: number;
  totalCount?: number;
  searchPlaceholder: string;
  endpoint: ProductsUrl;
  directories?: Partial<DirectoriesResponse>;
  layoutStyles?: LayoutStyles;
  productType?: ProductsKindSearch;
}

const normalizeAppliedParams = (
  queryParams: QueryProductsParams,
  takeCount: number,
  currentPage: number,
): Partial<ProductQueryParams> => {
  return {
    chef_ids: queryParams.chef_ids ? queryParams.chef_ids?.split(',').map(Number) || [] : [],
    supplier_ids: queryParams.supplier_ids ? String(queryParams.supplier_ids)?.split(',').map(Number) || [] : [],
    cuisine_ids: queryParams.cuisine_ids ? queryParams.cuisine_ids?.split(',').map(Number) || [] : [],
    category_ids: queryParams.category_ids ? String(queryParams.category_ids)?.split(',').map(Number) || [] : [],
    maxPrice: Number(queryParams.maxPrice) || 0,
    minPrice: Number(queryParams.minPrice) || 0,
    query: queryParams.query || '',
    take: takeCount,
    page: currentPage,
    orderBy: queryParams.orderBy,
  };
};

const defaultStyles = {
  container: true,
};

export const Products: React.FC<ProductsProps> = ({
  title,
  categoryTitle,
  breadcrumbs,
  items,
  filters,
  searchPlaceholder,
  endpoint,
  currentPage = 1,
  takeCount = 50,
  totalCount = 0,
  directories,
  layoutStyles = defaultStyles,
  productType = ProductsKindSearch.MENU,
}) => {
  const router = useRouter();
  const queryParams = router.query as QueryProductsParams;
  const jsonQueryParams = JSON.stringify(queryParams);
  const [products, setProducts] = React.useState<Product[]>(items || []);
  const [isLoading, loading, loaded] = useIsLoading(!(items.length > 0));
  const [totalCountProduct, setTotalCountProduct] = React.useState(totalCount);
  const [currentPageProduct, setCurrentPageProduct] = React.useState(currentPage);
  const isMountedRef = React.useRef<boolean>(false);
  const { t, getTranslatedText } = useTranslate(['breadcrumbs', 'chefs-store']);
  const { hasFavorite, toggleFavorite } = useFavorite(ProductsKindSearch.MENU);
  const [appliedFilters, setAppliedFilters] = React.useState<ProductQueryParams>(
    normalizeAppliedParams(queryParams, takeCount, currentPage),
  );

  useProductsQueryParams(appliedFilters);

  const setFilter = (name: keyof ProductQueryParams, value: unknown): void => {
    setAppliedFilters((prev) => ({ ...prev, [name]: value }));
  };

  const onChangePrice = (arr: [number, number]): void => {
    setFilter('minPrice', arr[0]);
    setFilter('maxPrice', arr[1]);
  };

  const onCategorySelect = (ids: number[]) => {
    setFilter('category_ids', ids);
  };

  const resetFilter = (name: keyof ProductQueryParams | 'price'): void => {
    if (name !== 'price') {
      setFilter(name, '');
    } else {
      setFilter('minPrice', '');
      setFilter('maxPrice', '');
    }
  };

  const fetchProducts = React.useCallback(async (): Promise<void> => {
    try {
      loading();
      const data = (await ProductsApi.getAll(endpoint, appliedFilters)) as ResponseWithMeta;
      loaded();
      setProducts(data.items);
      setTotalCountProduct(data.meta.total);
    } catch (err) {
      console.warn(`Products load [endpoint: ${endpoint}]`, err);
    } finally {
      loaded();
    }
  }, [appliedFilters, endpoint, loaded, loading]);

  const handlePagination = (page: number): void => {
    setAppliedFilters((prev) => ({ ...prev, page }));
    setCurrentPageProduct(page);
  };

  React.useEffect(() => {
    if (isMountedRef.current) {
      fetchProducts();
    }
  }, [appliedFilters, fetchProducts]);

  React.useEffect(() => {
    isMountedRef.current = true;
    loaded();
  }, []);

  React.useEffect(() => {
    setAppliedFilters(normalizeAppliedParams(queryParams, takeCount, currentPage));
  }, [jsonQueryParams]);

  const filtersComponents: Partial<Record<AvailableFilters, React.ReactNode>> = {
    suppliers: (
      <FiltersListAsync
        label={t('suppliers')}
        directory="suppliers"
        testId="supplier-filter"
        selected={appliedFilters.supplier_ids}
        onApply={(arr): void => setFilter('supplier_ids', arr)}
        onReset={(): void => resetFilter('supplier_ids')}
      />
    ),
    cuisines: (
      <FiltersListAsync
        label={t('cuisines')}
        directory="cuisines"
        testId="cuisines-filter"
        selected={appliedFilters.cuisine_ids}
        onApply={(arr): void => setFilter('cuisine_ids', arr)}
        onReset={(): void => resetFilter('cuisine_ids')}
      />
    ),
    chefs: (
      <FiltersListAsync
        label={t('chefs')}
        directory="chefs"
        testId="chefs-filter"
        selected={appliedFilters.chef_ids}
        onApply={(arr): void => setFilter('chef_ids', arr)}
        onReset={(): void => resetFilter('chef_ids')}
      />
    ),
    price: (
      <PriceFilter
        range={[0, 15000]}
        value={
          appliedFilters.minPrice || appliedFilters.maxPrice
            ? [appliedFilters.minPrice || 0, appliedFilters.maxPrice || 15000]
            : undefined
        }
        onApply={onChangePrice}
        onReset={(): void => resetFilter('price')}
      />
    ),
  };

  return (
    <ProductsLayout
      styles={layoutStyles}
      pageTitle={categoryTitle || title}
      breadcrumbs={breadcrumbs || [{ title: t('home'), url: '/' }, { title }]}
    >
      <div className="mb-30">
        <Search
          placeholder={searchPlaceholder}
          value={appliedFilters.query}
          onChange={(value): void => setFilter('query', value)}
        />
      </div>
      <div className={clsx('align-items-center justify-content-between mb-50', styles.filtersWrapper)}>
        {Number(filters?.length) > 0 && (
          <>
            {filters?.includes('categories') && (
              <ProductCategoriesList
                title={t('category-title')}
                onCategorySelect={onCategorySelect}
                selected={appliedFilters.category_ids}
                items={directories?.categories}
                isAsync
              />
            )}
            <div className="d-flex mb-40">
              {filters?.map((key) => (
                <div key={key} className="mr-10">
                  {filtersComponents[key]}
                </div>
              ))}
            </div>
          </>
        )}
        <div className="mb-40">
          <SortBy
            items={sortByItems}
            onSortSelect={(value) => {
              setFilter('orderBy', value);
            }}
            value={appliedFilters.orderBy || OrderByProduct.NAME_DESC}
          />
        </div>
      </div>
      <CardsList
        classes={categoryTitle ? { list: 'categoryList' } : undefined}
        skeletonWidth={categoryTitle ? 244 : undefined}
        itemsLength={products?.length}
        isLoading={isLoading}
        isLoaded={!isLoading}
      >
        {products.map((item) => (
          <Link key={item.id} href={`${productType}/${item.slug}`}>
            <a href={`${productType}/${item.slug}`}>
              <ProductCard
                classes={categoryTitle ? { cardItem: 'categoryCardItem' } : undefined}
                onClickFavorite={(): void => toggleFavorite(Number(item.id))}
                favorite={hasFavorite(Number(item.id))}
                type={item.type}
                id={Number(item.id)}
                name={getTranslatedText(item, 'name')}
                description={getTranslatedText(item, 'description')}
                imageUrl={item.media[0]?.url}
                price={item.price}
                rating={item.rating}
                size="large"
                cuisine={item.cuisine?.name}
                slug={item.slug}
              />
            </a>
          </Link>
        ))}
      </CardsList>
      {!!products?.length && (
        <ProductsPagination
          currentCount={products.length}
          currentPage={currentPageProduct}
          loading={isLoading}
          takeCount={takeCount}
          totalCount={totalCountProduct}
          onPaginate={handlePagination}
        />
      )}
    </ProductsLayout>
  );
};
