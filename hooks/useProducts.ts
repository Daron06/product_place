import usePrevious from 'ahooks/lib/usePrevious';
import { DateIntervals } from 'components/Calendar';
import format from 'date-fns/format';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  removeFilters,
  setDateRange,
  setFilters,
  setMasterClassType,
  setProductsCategoryIds,
  setProductsChefIds,
  setProductsCuisineIds,
  setProductsKind,
  setProductsPageNumber,
  setProductsPriceRange,
  setProductsRating,
  setProductsSearchQuery,
  setProductsSortBy,
  setProductsSupplierIds,
} from 'redux/ducks/products/actionCreators';
import {
  selectProductsCurrentPage,
  selectProductsIsLoaded,
  selectProductsIsLoading,
  selectProductsItems,
  selectProductsQueryParams,
  selectProductsTakeCount,
  selectProductsTotalCount,
} from 'redux/ducks/products/selectors';
import { ImmutableProductsState } from 'redux/ducks/products/types/state';
import { OrderByProduct, ProductQueryParams, ProductsKindSearch } from 'services/types';

import useProductsQueryParams from './useProductsQueryParams';

export interface UseProducts {
  currentPage: number | undefined;
  fetchAllProducts: () => void;
  items: ImmutableProductsState['items'];
  isLoading: boolean;
  isLoaded: boolean;
  onClickSearch: () => void;
  onSearchQueryChange?: (value: string) => void;
  onPriceRangeApply: (priceRange: [number, number]) => void;
  onChefsApply: (ids: Array<string | number>) => void;
  onSuppliersApply?: (ids: number[]) => void;
  onCuisineApply: (ids: number[]) => void;
  onDurationApply?: (ids: number[]) => void;
  onSortMenu: (value: OrderByProduct) => void;
  onCategoryToggle?: (ids: number[]) => void;
  onDateApply?: (date: DateIntervals) => void;
  onPaginate: (number: number) => void;
  onMasterClassTypeApply?: (type: string[]) => void;
  onRatingApply?: (values: number[]) => void;
  onFilterReset: (key: Array<keyof ProductQueryParams>) => void;
  onGuestsApply?: (values: number[]) => void;
  totalCount: number;
  takeCount: number;
  queryParams: ImmutableProductsState['queryParams'];
}

export default function useProducts(productsKind: ProductsKindSearch, params?: ProductQueryParams): UseProducts {
  const dispatch = useDispatch();
  const items = useSelector(selectProductsItems);
  const isLoading = useSelector(selectProductsIsLoading);
  const isLoaded = useSelector(selectProductsIsLoaded);
  const totalCount = useSelector(selectProductsTotalCount);
  const currentPage = useSelector(selectProductsCurrentPage);
  const takeCount = useSelector(selectProductsTakeCount);
  const queryParams = useSelector(selectProductsQueryParams);
  const isMountedRef = React.useRef<boolean>(false);

  useProductsQueryParams(queryParams);

  const prevSearchQuery = usePrevious(queryParams.query);

  const fetchAllProducts = (): void => {
    dispatch(fetchProducts());
  };

  const onFilterReset = (keys: Array<keyof ProductQueryParams>): void => {
    dispatch(removeFilters(keys));
  };

  const onClickSearch = (): void => {
    if (prevSearchQuery !== queryParams.query) {
      dispatch(fetchProducts());
    }
  };

  const onPaginate = (page: number): void => {
    dispatch(setProductsKind(productsKind));
    dispatch(setProductsPageNumber(page));
  };

  const onSearchQueryChange = (value: string): void => {
    if (value) {
      dispatch(setProductsSearchQuery(value));
    } else if (queryParams.query?.length) {
      dispatch(setProductsSearchQuery(undefined));
    }
  };

  const onPriceRangeApply = (priceRange: [number, number]): void => {
    dispatch(setProductsPriceRange(priceRange));
  };

  const onCuisineApply = (ids: number[]): void => {
    dispatch(setProductsCuisineIds(ids));
  };

  const onChefsApply = (ids: Array<number | string>): void => {
    dispatch(setProductsChefIds(ids.map(Number)));
  };

  const onSuppliersApply = (ids: number[]): void => {
    dispatch(setProductsSupplierIds(ids));
  };

  const onSortMenu = (order: OrderByProduct): void => {
    dispatch(setProductsSortBy(order));
  };

  const onCategoryToggle = (ids: number[]): void => {
    dispatch(setProductsCategoryIds(ids));
  };

  const onDateApply = (date: DateIntervals): void => {
    dispatch(setDateRange({ dateFrom: format(date.start, 'MM-dd-yyyy'), dateTo: format(date.end, 'MM-dd-yyyy') }));
  };

  const onMasterClassTypeApply = (value: string[]): void => {
    dispatch(setMasterClassType(value));
  };

  const onRatingApply = (numbers: number[]): void => {
    dispatch(setProductsRating(numbers));
  };

  const onGuestsApply = (values: number[]): void => {
    dispatch(setFilters({ people: values }));
  };

  const onDurationApply = (values: number[]): void => {
    dispatch(setFilters({ duration: values }));
  };

  React.useEffect(() => {
    if ((typeof window !== 'undefined' && window.location.pathname.includes('/chefs/')) || isMountedRef.current) {
      dispatch(setFilters(params));
    }
    isMountedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    currentPage,
    fetchAllProducts,
    items,
    isLoading,
    isLoaded,
    onClickSearch,
    onDateApply,
    onPaginate,
    onSearchQueryChange,
    onPriceRangeApply,
    onCategoryToggle,
    onDurationApply,
    onCuisineApply,
    onChefsApply,
    onSuppliersApply,
    onSortMenu,
    onFilterReset,
    onMasterClassTypeApply,
    onRatingApply,
    onGuestsApply,
    totalCount,
    takeCount,
    queryParams,
  };
}
