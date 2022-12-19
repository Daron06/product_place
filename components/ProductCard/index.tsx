import { CardItem, CardItemProps } from 'components/CardItem';
import React from 'react';

import { useCartItem } from '../../hooks/useCartItem';
import { CartOptionItem } from '../../redux/ducks/cart/constants';
import { ProductType } from '../../redux/ducks/favorites/types/contracts';

interface ProductCardProps extends Omit<CardItemProps, 'onPlus' | 'onMinus' | 'count'> {
  disabledFavorite?: boolean;
  type: ProductType;
  size?: CardItemProps['size'];
  id: number;
  cartCount?: number;
  price: number;
  importButton?: CardItemProps['importButton'];
  topRightAdornment?: CardItemProps['topRightAdornment'];
  isHome?: boolean;
  isChefsStorePage?: boolean;
  options?: CartOptionItem[];
  hidePrice?: boolean;
  slug: string;
}

const defaultTags = [];

export const ProductCard = React.memo(function ProductCard({
  disabledFavorite,
  type,
  id,
  importButton,
  classes,
  description,
  favorite = false,
  onClickFavorite,
  imageUrl,
  name,
  price,
  rating,
  size,
  isBlog = false,
  isHome = false,
  isChefsStorePage = false,
  icon,
  tooltipText,
  topRightAdornment,
  slug,
  options = defaultTags,
  hidePrice = false,
  cuisine,
}: ProductCardProps) {
  const { onPlus, onMinus, count } = useCartItem({
    item: {
      id,
      name,
      price,
      image: imageUrl,
      product: { id, type, slug },
      type,
      options: [options[0]],
    },
  });

  const handleClickPlus = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault();
      onPlus();
    },
    [onPlus],
  );

  const handleClickMinus = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault();
      onMinus();
    },
    [onMinus],
  );

  return (
    <CardItem
      id={id}
      classes={classes}
      disabledFavorite={disabledFavorite}
      description={description}
      favorite={favorite}
      imageUrl={imageUrl}
      importButton={importButton}
      name={name}
      price={price}
      rating={rating}
      size={size}
      cuisine={cuisine}
      type={type}
      isBlog={isBlog}
      icon={icon}
      tooltipText={tooltipText}
      topRightAdornment={topRightAdornment}
      count={count}
      onMinus={handleClickMinus}
      onPlus={handleClickPlus}
      onClickFavorite={onClickFavorite}
      isHome={isHome}
      hidePrice={hidePrice}
      isChefsStorePage={isChefsStorePage}
    />
  );
});
