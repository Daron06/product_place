import { ProductDetailsActionTypes, SetLoading, SetProductsDetails } from 'hooks/useProductDetails/actions';
import { Product } from 'redux/ducks/products/types/contracts';

export const setLoading = (): SetLoading => ({
  type: ProductDetailsActionTypes.SET_LOADING,
  payload: true,
});

export const setProductDetails = (payload: Product): SetProductsDetails => ({
  type: ProductDetailsActionTypes.SET_PRODUCT_DETAILS,
  payload,
});
