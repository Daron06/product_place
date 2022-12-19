/* eslint-disable no-param-reassign */
import { ProductDetailsActionTypes, SetLoading, SetProductsDetails } from 'hooks/useProductDetails/actions';
import produce, { Draft, Immutable } from 'immer';
import { Product } from 'redux/ducks/products/types/contracts';

export enum ProductDetailsLoadingState {
  LOADING = 'LOADING',
  LOADED = 'LOADED',
}

export type ProductDetailsState = {
  data: Product | null;
  isLoading: boolean;
};

type ProductDetailsActions = SetLoading | SetProductsDetails;

export type ImmutableProductDetailsState = Immutable<ProductDetailsState>;

export const initialProductState: ImmutableProductDetailsState = {
  data: null,
  isLoading: true,
};

export const reducer = produce((draftState: Draft<ImmutableProductDetailsState>, action: ProductDetailsActions) => {
  switch (action.type) {
    case ProductDetailsActionTypes.SET_LOADING:
      draftState.isLoading = action.payload;
      break;

    case ProductDetailsActionTypes.SET_PRODUCT_DETAILS:
      draftState.data = action.payload;
      draftState.isLoading = false;
      break;
    default:
      break;
  }
}, initialProductState);
