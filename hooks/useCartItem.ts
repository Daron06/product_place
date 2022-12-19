import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeProductCount, removeProductFromCart } from '../redux/ducks/cart/actionsCreators';
import { CartProductItem } from '../redux/ducks/cart/constants';
import { createSelectorGetCartItem } from '../redux/ducks/cart/selectors';

interface UseCartItemProps {
  item: Omit<CartProductItem, 'quantity'>;
}

interface UseCartItemReturnProps {
  count: number;
  onPlus: () => void;
  onMinus: () => void;
  onRemove: () => void;
}

export const useCartItem = ({ item }: UseCartItemProps): UseCartItemReturnProps => {
  const dispatch = useDispatch();
  const selectCartItem = createSelectorGetCartItem(item);
  const currentProductInCart = useSelector(selectCartItem);
  const itemCount = currentProductInCart?.quantity || 0;

  const onPlus = React.useCallback(
    function onPlus() {
      dispatch(
        changeProductCount({
          id: item.product.id,
          quantity: itemCount + 1,
          type: item.type,
          options: item.options?.filter((v) => v !== undefined),
          product: { id: item.product.id, type: item.type, slug: item.product.slug },
        }),
      );
    },
    [itemCount, item],
  );

  const onMinus = React.useCallback(
    function onMinus() {
      if (itemCount - 1 >= 1) {
        dispatch(
          changeProductCount({
            id: item.product.id,
            quantity: itemCount - 1,
            type: item.type,
            options: item.options,
            product: { id: item.product.id, type: item.type, slug: item.product.slug },
          }),
        );
      }
    },
    [itemCount],
  );

  const onRemove = React.useCallback(function onRemove() {
    if (item) {
      dispatch(removeProductFromCart(String(item.id)));
    }
  }, []);

  return {
    onPlus,
    onMinus,
    onRemove,
    count: itemCount,
  };
};
