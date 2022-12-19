import { actionCreator } from '../../../../utils/actionCreator';
import {
  ActivateProductsItemsInterface,
  AdminProductsActionsTypes,
  ChangePaginationInterface,
  DeactivateItemsInterface,
  DeleteProductsItemsInterface,
  FetchProductsItemsInterface,
  ImportProductStore,
  ResetProductsInterface,
  SetLoadingInterface,
  SetProductsEndpointInterface,
  SetProductsItemsInterface,
} from './types/actions';

export const setLoading = actionCreator<SetLoadingInterface>(AdminProductsActionsTypes.SET_LOADING);

export const setProductsItems = actionCreator<SetProductsItemsInterface>(AdminProductsActionsTypes.SET_ITEMS);

export const fetchProductsItems = actionCreator<FetchProductsItemsInterface>(AdminProductsActionsTypes.FETCH_ITEMS);

export const resetProductState = actionCreator<ResetProductsInterface>(AdminProductsActionsTypes.RESET);

export const changePagination = actionCreator<ChangePaginationInterface>(AdminProductsActionsTypes.CHANGE_PAGINATION);

export const activateProductsItems = actionCreator<ActivateProductsItemsInterface>(
  AdminProductsActionsTypes.ACTIVATE_ITEMS,
);

export const setProductsEndpoint = actionCreator<SetProductsEndpointInterface>(
  AdminProductsActionsTypes.SET_PRODUCTS_ENDPOINT,
);

export const deactivateProductsItems = actionCreator<DeactivateItemsInterface>(
  AdminProductsActionsTypes.DEACTIVATE_ITEMS,
);

export const deleteProductsItems = actionCreator<DeleteProductsItemsInterface>(AdminProductsActionsTypes.DELETE_ITEMS);

export const importProductToStore = actionCreator<ImportProductStore>(
  AdminProductsActionsTypes.IMPORT_PRODUCT_TO_STORE,
);
