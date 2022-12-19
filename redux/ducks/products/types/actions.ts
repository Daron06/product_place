import { Action } from 'redux';
import { Chef, Product } from 'redux/ducks/products/types/contracts';
import { HydrateAction, LoadingState } from 'redux/types';
import { ProductQueryParams, ProductsKindSearch } from 'services/types';

export enum ProductsActionTypes {
  REMOVE_FILTERS = 'PRODUCTS/REMOVE_FILTERS',
  RESET_PRODUCTS = 'PRODUCTS/RESET_PRODUCTS',
  FETCH_PRODUCTS = 'PRODUCTS/FETCH_PRODUCTS',
  SET_PRODUCTS_ITEMS = 'PRODUCTS/SET_PRODUCTS',
  SET_SORT_BY = 'PRODUCTS/SET_SORT_BY',
  SET_TOTAL_COUNT = 'PRODUCTS/SET_TOTAL_COUNT',
  SET_TAKE_COUNT = 'PRODUCTS/SET_TAKE_COUNT',
  SET_SEARCH_QUERY = 'PRODUCTS/SET_SEARCH_QUERY',
  SET_SUPPLIER_IDS = 'PRODUCTS/SET_SUPPLIER_IDS',
  SET_PAGE_NUMBER = 'PRODUCTS/SET_PAGE_NUMBER',
  SET_CUISINE_IDS = 'PRODUCTS/SET_CUISINE_IDS',
  SET_CHEF_IDS = 'PRODUCTS/SET_CHEF_IDS',
  SET_PRICE_RANGE = 'PRODUCTS/SET_PRICE_RANGE',
  SET_DATE_RANGE = 'PRODUCTS/SET_DATE_RANGE',
  SET_LOADING_STATUS = 'PRODUCTS/SET_LOADING_STATUS',
  SET_FILTERS = 'PRODUCTS/SET_FILTERS',
  SET_PRODUCTS_KIND = 'PRODUCTS/SET_PRODUCTS_KIND',
  SET_CATEGORY_IDS = 'PRODUCTS/SET_CATEGORY_IDS',
  SET_MASTERCLASS_TYPE = 'PRODUCTS/SET_MASTERCLASS_TYPE',
  SET_RATING = 'PRODUCTS/SET_RATING',
  SET_CHEF_TO_PRODUCT_STORE = 'PRODUCTS/SET_CHEF_TO_PRODUCT_STORE',
  DELETE_CHEF_FROM_PRODUCT_STORE = 'PRODUCTS/DELETE_CHEF_FROM_PRODUCT_STORE',
}

export interface SetProductsInterface extends Action<ProductsActionTypes> {
  type: ProductsActionTypes.SET_PRODUCTS_ITEMS;
  payload: Product[] | undefined;
}

export interface SetChefToProductStoreInterface extends Action<ProductsActionTypes> {
  type: ProductsActionTypes.SET_CHEF_TO_PRODUCT_STORE;
  payload: {
    productId: number;
    chef: Chef | null;
  };
}
export interface DeleteChefToProductStoreInterface extends Action<ProductsActionTypes> {
  type: ProductsActionTypes.DELETE_CHEF_FROM_PRODUCT_STORE;
  payload: number;
}

export interface SetFiltersInterface extends Action<ProductsActionTypes> {
  type: ProductsActionTypes.SET_FILTERS;
  payload: ProductQueryParams;
}

export interface SetLoadingStatusInterface extends Action<ProductsActionTypes> {
  type: ProductsActionTypes.SET_LOADING_STATUS;
  payload: LoadingState;
}

export interface SetSortByInterface extends Action<ProductsActionTypes> {
  type: ProductsActionTypes.SET_SORT_BY;
  payload: ProductQueryParams['orderBy'];
}

export interface SetSearchQueryInterface extends Action<ProductsActionTypes> {
  type: ProductsActionTypes.SET_SEARCH_QUERY;
  payload: string;
}

export interface SetPageNumberInterface extends Action<ProductsActionTypes> {
  type: ProductsActionTypes.SET_PAGE_NUMBER;
  payload: number;
}

export interface SetChefIdsInterface extends Action<ProductsActionTypes> {
  type: ProductsActionTypes.SET_CHEF_IDS;
  payload: number[];
}

export interface SetSupplierIdsInterface extends Action<ProductsActionTypes> {
  type: ProductsActionTypes.SET_SUPPLIER_IDS;
  payload: number[];
}

export interface SetCuisineIdsInterface extends Action<ProductsActionTypes> {
  type: ProductsActionTypes.SET_CUISINE_IDS;
  payload: number[];
}

export interface SetCategoryIdsInterface extends Action<ProductsActionTypes> {
  type: ProductsActionTypes.SET_CATEGORY_IDS;
  payload: number[];
}

export interface SetMasterClassesTypeInterface extends Action<ProductsActionTypes> {
  type: ProductsActionTypes.SET_MASTERCLASS_TYPE;
  payload: string[];
}

export interface SetRatingInterface extends Action<ProductsActionTypes> {
  type: ProductsActionTypes.SET_RATING;
  payload: number[];
}

export interface SetPriceRangeInterface extends Action<ProductsActionTypes> {
  type: ProductsActionTypes.SET_PRICE_RANGE;
  payload: [number, number];
}

export interface SetDateRangeInterface extends Action<ProductsActionTypes> {
  type: ProductsActionTypes.SET_DATE_RANGE;
  payload: { dateFrom: string; dateTo: string };
}

export interface RemoveFilterInterface extends Action<ProductsActionTypes> {
  type: ProductsActionTypes.REMOVE_FILTERS;
  payload: Array<keyof ProductQueryParams>;
}

export interface SetTotalCountInterface extends Action<ProductsActionTypes> {
  type: ProductsActionTypes.SET_TOTAL_COUNT;
  payload: number;
}

export interface SetTakeCountInterface extends Action<ProductsActionTypes> {
  type: ProductsActionTypes.SET_TAKE_COUNT;
  payload: number;
}

export interface FetchRecipesInterface extends Action<ProductsActionTypes> {
  type: ProductsActionTypes.FETCH_PRODUCTS;
  payload: ProductsKindSearch.RECIPE;
}

export interface SetProductsKindInterface extends Action<ProductsActionTypes> {
  type: ProductsActionTypes.SET_PRODUCTS_KIND;
  payload: ProductsKindSearch;
}

export interface ResetProductsInterface extends Action<ProductsActionTypes> {
  type: ProductsActionTypes.RESET_PRODUCTS;
}

export type ProductsAction =
  | SetProductsInterface
  | SetSortByInterface
  | SetSearchQueryInterface
  | SetPageNumberInterface
  | SetChefIdsInterface
  | SetCuisineIdsInterface
  | SetCategoryIdsInterface
  | SetPriceRangeInterface
  | SetDateRangeInterface
  | FetchRecipesInterface
  | RemoveFilterInterface
  | ResetProductsInterface
  | SetTotalCountInterface
  | SetRatingInterface
  | SetLoadingStatusInterface
  | SetMasterClassesTypeInterface
  | SetProductsKindInterface
  | SetChefToProductStoreInterface
  | SetSupplierIdsInterface
  | DeleteChefToProductStoreInterface
  | SetFiltersInterface
  | SetTakeCountInterface
  | HydrateAction;
