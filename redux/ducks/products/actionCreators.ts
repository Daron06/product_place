import { actionCreator } from 'utils/actionCreator';

import {
  DeleteChefToProductStoreInterface,
  FetchRecipesInterface,
  ProductsActionTypes,
  RemoveFilterInterface,
  ResetProductsInterface,
  SetCategoryIdsInterface,
  SetChefIdsInterface,
  SetChefToProductStoreInterface,
  SetCuisineIdsInterface,
  SetDateRangeInterface,
  SetFiltersInterface,
  SetLoadingStatusInterface,
  SetMasterClassesTypeInterface,
  SetPageNumberInterface,
  SetPriceRangeInterface,
  SetProductsInterface,
  SetProductsKindInterface,
  SetRatingInterface,
  SetSearchQueryInterface,
  SetSortByInterface,
  SetSupplierIdsInterface,
  SetTakeCountInterface,
  SetTotalCountInterface,
} from './types/actions';

export const setProductsItems = actionCreator<SetProductsInterface>(ProductsActionTypes.SET_PRODUCTS_ITEMS);

export const setProductsSearchQuery = actionCreator<SetSearchQueryInterface>(ProductsActionTypes.SET_SEARCH_QUERY);

export const setProductsPageNumber = actionCreator<SetPageNumberInterface>(ProductsActionTypes.SET_PAGE_NUMBER);

export const setProductsSortBy = actionCreator<SetSortByInterface>(ProductsActionTypes.SET_SORT_BY);

export const setProductsChefIds = actionCreator<SetChefIdsInterface>(ProductsActionTypes.SET_CHEF_IDS);

export const setProductsSupplierIds = actionCreator<SetSupplierIdsInterface>(ProductsActionTypes.SET_SUPPLIER_IDS);

export const setProductsCategoryIds = actionCreator<SetCategoryIdsInterface>(ProductsActionTypes.SET_CATEGORY_IDS);

export const setProductsRating = actionCreator<SetRatingInterface>(ProductsActionTypes.SET_RATING);

export const setMasterClassType = actionCreator<SetMasterClassesTypeInterface>(
  ProductsActionTypes.SET_MASTERCLASS_TYPE,
);

export const setLoadingStatus = actionCreator<SetLoadingStatusInterface>(ProductsActionTypes.SET_LOADING_STATUS);

export const setFilters = actionCreator<SetFiltersInterface>(ProductsActionTypes.SET_FILTERS);

export const setProductsCuisineIds = actionCreator<SetCuisineIdsInterface>(ProductsActionTypes.SET_CUISINE_IDS);

export const setProductsPriceRange = actionCreator<SetPriceRangeInterface>(ProductsActionTypes.SET_PRICE_RANGE);

export const setDateRange = actionCreator<SetDateRangeInterface>(ProductsActionTypes.SET_DATE_RANGE);

export const setTotalCount = actionCreator<SetTotalCountInterface>(ProductsActionTypes.SET_TOTAL_COUNT);

export const setTakeCount = actionCreator<SetTakeCountInterface>(ProductsActionTypes.SET_TAKE_COUNT);

export const removeFilters = actionCreator<RemoveFilterInterface>(ProductsActionTypes.REMOVE_FILTERS);

export const fetchProducts = actionCreator<FetchRecipesInterface>(ProductsActionTypes.FETCH_PRODUCTS);

export const setProductsKind = actionCreator<SetProductsKindInterface>(ProductsActionTypes.SET_PRODUCTS_KIND);

export const resetProducts = actionCreator<ResetProductsInterface>(ProductsActionTypes.RESET_PRODUCTS);

export const setChefToProduct = actionCreator<SetChefToProductStoreInterface>(
  ProductsActionTypes.SET_CHEF_TO_PRODUCT_STORE,
);

export const deleteChefFromProduct = actionCreator<DeleteChefToProductStoreInterface>(
  ProductsActionTypes.DELETE_CHEF_FROM_PRODUCT_STORE,
);
