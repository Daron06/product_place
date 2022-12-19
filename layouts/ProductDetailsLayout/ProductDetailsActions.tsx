import clsx from 'clsx';
import { AddCartButtons } from 'components/AddCartButtons';
import { Button } from 'components/Button';
import { Icon } from 'components/Icon';
import { useCartItem } from 'hooks/useCartItem';
import { useFavorite } from 'hooks/useFavorite';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';
import { useSelector } from 'react-redux';
import { ProductType } from 'redux/ducks/favorites/types/contracts';
import { selectUserData } from 'redux/ducks/user/selectors';

import { AddToCartButton } from '../../components/AddToCartButton';
import { CartOptionItem } from '../../redux/ducks/cart/constants';
import styles from './ProductDetailsLayout.module.scss';

interface ProductDetailsActionsProps {
  disabled?: boolean;
  id: string;
  favoriteType: ProductType;
  price: number;
  name: string;
  image?: string;
  options?: CartOptionItem[];
  type: ProductType;
  slug: string;
}

export const ProductDetailsActions: React.FC<ProductDetailsActionsProps> = ({
  disabled = false,
  id,
  favoriteType,
  price,
  name,
  options,
  image,
  slug,
  type,
}): React.ReactElement => {
  const { hasFavorite, toggleFavorite } = useFavorite(favoriteType);
  const userData = useSelector(selectUserData);

  const { onPlus, onMinus, count } = useCartItem({
    item: {
      id: Number(id),
      name,
      price,
      image: image ?? '',
      options,
      product: { id: Number(id), type, slug },
      type,
    },
  });

  const onClickFavorite = (): void => {
    toggleFavorite(Number(id));
  };

  const { t } = useTranslate('product-details');

  return (
    <div className="pb-20 mb-20 d-flex align-items-center">
      {!count ? (
        <AddToCartButton textAED={t('aed')} disabled={disabled} onClick={onPlus} totalPrice={price}>
          {t('add-to-cart')}
        </AddToCartButton>
      ) : (
        <AddCartButtons size="large" onPlus={onPlus} onMinus={onMinus} count={count} />
      )}
      {userData && (
        <Button
          onClick={onClickFavorite}
          classes={{
            root: styles.buttonRoot,
            label: clsx({
              [styles.favoriteButtonLabelActive]: hasFavorite(Number(id)),
            }),
          }}
          color="default"
          size="large"
          variant="outlined"
        >
          <Icon type="heart" className={styles.buttonHeart} />
        </Button>
      )}
    </div>
  );
};
