/* eslint-disable no-param-reassign */
import _omit from 'lodash/omit';

import { OrderSupplier } from '../pages/checkout';
import { ImmutableCartState } from '../redux/ducks/cart/types/state';

interface OrderProducts {
  [key: number]: OrderSupplier;
}

export const groupSuppliers = (items: ImmutableCartState['items']): OrderSupplier[] =>
  Object.values(
    items.reduce<OrderProducts>((prev, cartItem) => {
      const { product } = cartItem;
      if (product.supplier) {
        if (prev[product.supplier.id]) {
          prev[product.supplier.id].items.push(_omit(cartItem, 'product.supplier'));
        } else {
          prev[product.supplier.id] = {};
          prev[product.supplier.id].items = [_omit(cartItem, 'product.supplier')];
        }
        prev[product.supplier.id] = { ...prev[product.supplier.id], ...product.supplier };
      }
      return prev;
    }, {}) || {},
  );
