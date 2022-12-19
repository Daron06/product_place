import { useTranslate } from 'hooks/useTranslate';
import React from 'react';

import { useCartItem } from '../../hooks/useCartItem';
import { CartProductItem } from '../../redux/ducks/cart/constants';
import { CartItemView } from './View';

type CartItemsProps = CartProductItem;

export const CartItem: React.FC<CartItemsProps> = ({
  classes,
  id,
  name,
  image,
  price,
  product,
  options = [],
  type,
}) => {
  const { getTranslatedText, t } = useTranslate('cart');
  const { onPlus, onMinus, onRemove, count } = useCartItem({
    item: {
      id: Number(id),
      image,
      name,
      price,
      product,
      options,
      type,
    },
  });

  const handleClickRemove = (): void => {
    if (window.confirm(t('cart-remove-confirmation-text'))) {
      onRemove();
    }
  };

  return (
    <CartItemView
      classes={classes}
      id={id}
      count={count}
      name={name}
      image={image}
      price={price}
      onPlus={onPlus}
      onMinus={onMinus}
      onRemove={handleClickRemove}
      description={options?.[0] && getTranslatedText(options?.[0], 'name')}
      product={product}
    />
  );
};
