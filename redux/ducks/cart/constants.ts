import { Supplier } from '../../../services/types';
import { LoadingState } from '../../types';
import { ProductType } from '../favorites/types/contracts';
import { ImmutableCartState } from './types/state';

export type CartOptionItem = {
  category?: string;
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export interface CartProductItem {
  classes?: {
    cartItemInfo?: string;
  };
  id: number;
  name: string;
  name__ar?: string;
  quantity: number;
  price: number;
  image: string;
  product: { id: number; supplier?: Supplier; type: ProductType; slug: string };
  options?: CartOptionItem[];
  type: ProductType;
}

export interface CartData {
  id: number;
  session: string;
  total: number;
  products: CartProductItem[];
}

export const initialUserState: ImmutableCartState = {
  loadingStatus: LoadingState.NEVER,
  items: [],
  totalCount: 0,
  totalPrice: 0,
  isAdding: false,
  coupon: {
    code: '',
    type: '',
    value: 0,
  },
};
