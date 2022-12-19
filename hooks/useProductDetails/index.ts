import { setLoading, setProductDetails } from 'hooks/useProductDetails/actionCreators';
import { ImmutableProductDetailsState, initialProductState, reducer } from 'hooks/useProductDetails/reducer';
import { useRouter } from 'next/router';
import React from 'react';
import { Product } from 'redux/ducks/products/types/contracts';
import { ProductsApi, ProductsUrl } from 'services/api/ProductsApi';

export function useProductDetails(initialProduct: Product | null, url: ProductsUrl): ImmutableProductDetailsState {
  const [productDetails, dispatch] = React.useReducer(reducer, {
    ...initialProductState,
    data: initialProduct ?? null,
  });
  const { query } = useRouter();

  React.useEffect(() => {
    dispatch(setLoading());

    if (typeof query.slug !== 'string') {
      throw new Error(`The rout slug is not string ${query.slug}`);
    }

    const getProductDetails = async (): Promise<void> => {
      try {
        const response = await ProductsApi.details(url, query.slug as string);
        dispatch(setProductDetails(response));
      } catch (error) {
        console.error(error);
      }
    };

    getProductDetails();
  }, [dispatch, query.slug]);

  return productDetails;
}
