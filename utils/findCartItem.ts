import { Immutable } from 'immer';

import { CartOptionItem, CartProductItem } from '../redux/ducks/cart/constants';
import { ProductType } from '../redux/ducks/favorites/types/contracts';

type Source = Immutable<{
  options?: CartOptionItem[];
  id: string | number;
  quantity?: number;
  product: CartProductItem['product'];
  type: ProductType;
}>;

export const equalProductBy = (type: ProductType, obj1: Source, obj2: Source): boolean => {
  if (type === 'chefStore') {
    if (obj1.options?.length) {
      return obj1.options?.map((o) => o?.id).join() === obj2.options?.map((o) => o?.id).join();
    }
    return equalProductBy('menu', obj1, obj2);
  }
  return obj1.type === obj2.type && Number(obj1.product.id || obj1.id) === Number(obj2.product?.id ?? obj2.id);
};

export const findCartItem = (arr: Readonly<Source[]>, findObj: Source): Source | undefined => {
  return arr.find((obj) => equalProductBy(findObj.type, obj, findObj));
};
