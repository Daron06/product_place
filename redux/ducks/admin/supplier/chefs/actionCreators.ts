import {
  ActivateSupplierChefsItemsInterface,
  ChangeSupplierChefsPagination,
  DeactivateSupplierChefsItemsInterface,
  FetchSupplierChefsInterface,
  SetSupplierChefsInterface,
  SetSupplierChefsLoadingInterface,
  SupplierActionsType,
} from 'redux/ducks/admin/supplier/chefs/types/actions';
import { actionCreator } from 'utils/actionCreator';

export const setLoading = actionCreator<SetSupplierChefsLoadingInterface>(SupplierActionsType.SET_LOADING);

export const fetchSupplierChefs = actionCreator<FetchSupplierChefsInterface>(SupplierActionsType.FETCH_SUPPLIER_CHEFS);

export const setSupplierChefs = actionCreator<SetSupplierChefsInterface>(SupplierActionsType.SET_SUPPLIER_CHEFS);

export const deactivateSupplerChefItems = actionCreator<DeactivateSupplierChefsItemsInterface>(
  SupplierActionsType.DEACTIVATE_ITEMS,
);

export const changeSupplerChefsPagination = actionCreator<ChangeSupplierChefsPagination>(
  SupplierActionsType.CHANGE_PAGINATION,
);

export const activateSupplerChefItems = actionCreator<ActivateSupplierChefsItemsInterface>(
  SupplierActionsType.ACTIVATE_ITEMS,
);
