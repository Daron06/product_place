import { actionCreator } from '../../../utils/actionCreator';
import {
  CartActionTypes,
  ChangeCartProductCountInterface,
  FetchCartDataInterface,
  RemoveProductFromCartInterface,
  ResetCartInterface,
  SetCartCouponInterface,
  SetCartDataInterface,
  SetCartLoadingStatus,
  UpdateCartItemFromResponseInterface,
} from './types/actions';
import { CartState } from './types/state';

export const fetchCartData = actionCreator<FetchCartDataInterface>(CartActionTypes.FETCH_CART_DATA);

export const setCartLoadingStatus = actionCreator<SetCartLoadingStatus>(CartActionTypes.SET_CART_LOADING_STATUS);

export const setCartData = actionCreator<SetCartDataInterface>(CartActionTypes.SET_CART_DATA);

export const changeProductCount = actionCreator<ChangeCartProductCountInterface>(CartActionTypes.CHANGE_PRODUCT_COUNT);

export const resetCart = actionCreator<ResetCartInterface>(CartActionTypes.RESET_CART);

export const updateCartItemFromResponse = actionCreator<UpdateCartItemFromResponseInterface>(
  CartActionTypes.UPDATE_CART_ITEM_FROM_RESPONSE,
);

export const removeProductFromCart = actionCreator<RemoveProductFromCartInterface>(
  CartActionTypes.REMOVE_PRODUCT_FROM_CART,
);

export const setSelectCartCoupon = (coupon: CartState['coupon']): SetCartCouponInterface => ({
  type: CartActionTypes.SET_COUPON,
  payload: coupon,
});
