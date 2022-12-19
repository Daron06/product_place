import { Immutable } from 'immer';

import { LoadingState } from '../../../types';
import { CartProductItem } from '../constants';

export interface CartState {
  loadingStatus: LoadingState;
  totalPrice: number;
  totalCount: number;
  items: CartProductItem[];
  isAdding: boolean;
  coupon: {
    code: string;
    value: number;
    type: '' | 'discount' | 'amount';
  };
}

export type ImmutableCartState = Immutable<CartState>;
