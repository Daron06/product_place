import { createSelector } from 'reselect';

import { findCartItem } from '../../../utils/findCartItem';
import { LoadingState, RootState } from '../../types';
import { CartProductItem } from './constants';
import { ImmutableCartState } from './types/state';

export const selectCartState = (state: RootState): ImmutableCartState => state.cart;

export const selectCartItems = (state: RootState): ImmutableCartState['items'] => selectCartState(state).items;

export const selectIsAdding = (state: RootState): boolean => selectCartState(state).isAdding;

export const selectCartIsLoaded = (state: RootState): boolean =>
  selectCartState(state).loadingStatus === LoadingState.LOADED;

export const selectCartTotal = (state: RootState): Pick<ImmutableCartState, 'totalPrice' | 'totalCount'> => ({
  totalPrice: selectCartState(state).totalPrice,
  totalCount: selectCartState(state).totalCount,
});

export const selectCartTotalCount = (state: RootState): number => selectCartState(state).totalCount;

export const selectCartCouponCode = (state: RootState): string => selectCartState(state).coupon.code;

export const createSelectorGetCartItem = (item: Omit<CartProductItem, 'quantity'>) =>
  createSelector(selectCartItems, (items) => findCartItem(items, item));
