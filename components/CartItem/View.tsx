import { Avatar } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';
import { useTranslate } from 'hooks/useTranslate';
import Link from 'next/link';
import React from 'react';

import { AddCartButtons } from '../AddCartButtons';
import styles from '../CartDrawer/CartDrawer.module.scss';

interface CartItemViewProps {
  classes?: {
    cartItemInfo?: string;
  };
  id: number;
  image: string;
  name: string;
  count: number;
  price: number;
  onPlus: () => void;
  onMinus: () => void;
  onRemove: () => void;
  description?: string;
  product?: { type: string; slug: string; id: number };
}

const productCartType = {
  recipe: 'recipes',
  chefStore: 'chefs-store',
  menu: 'menu',
};

export const CartItemView: React.FC<CartItemViewProps> = ({
  classes,
  id,
  image,
  name,
  count,
  price,
  onPlus,
  onMinus,
  onRemove,
  description,
  product,
}): React.ReactElement => {
  const { t, currentLanguage } = useTranslate('cart');
  return (
    <>
      <ListItem key={id} data-test-cart-product-name={name} className={styles.cartItem}>
        {product ? (
          <Link key={id} href={`/${productCartType[product.type]}/${product.slug}`}>
            <a href={`/${productCartType[product.type]}/${product.slug}`}>
              <ListItemAvatar
                style={currentLanguage === 'ar' ? { marginLeft: '20px' } : { marginRight: '20px' }}
                className={styles.cartItemImage}
              >
                <Avatar style={{ height: 66, width: 66 }} variant="rounded" src={`${image}?width=100&height=100`} />
              </ListItemAvatar>
            </a>
          </Link>
        ) : (
          <ListItemAvatar
            style={currentLanguage === 'ar' ? { marginLeft: '20px' } : { marginRight: '20px' }}
            className={styles.cartItemImage}
          >
            <Avatar style={{ height: 66, width: 66 }} variant="rounded" src={`${image}?width=100&height=100`} />
          </ListItemAvatar>
        )}

        <div className={clsx(styles.cartItemInfo, classes?.cartItemInfo)}>
          <ListItemText className={styles.cartItemInfoName} primary={name} secondary={description} />
          <div className={styles.cartItemInfoButtons}>
            <AddCartButtons count={count} size="small" onPlus={onPlus} onMinus={onMinus} />
            <div
              style={currentLanguage === 'ar' ? { marginRight: '15px' } : { marginLeft: '15px' }}
              className={styles.cartItemInfoPrice}
            >
              <b>{t('aed')} </b>
              <b>{Number(price)?.toFixed(2)}</b>
            </div>
          </div>
        </div>
        <div className={styles.cartRemoveItem} onClick={onRemove}>
          <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14.5" cy="14.5" r="14" stroke="#E0E0E0" />
            <path d="M10 10L19 19M10 19L19 10" stroke="#A0A0A0" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </ListItem>
      <Divider className={styles.cartDivider} variant="inset" component="li" />
    </>
  );
};
