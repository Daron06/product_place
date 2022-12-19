import { Button, CircularProgress, Drawer, IconButton, Link, List, Typography } from '@material-ui/core';
import EmptyCartIcon from 'assets/icons/empty-cart.svg';
import { AddToCartButton } from 'components/AddToCartButton';
import { CartItem } from 'components/CartItem';
import { Icon } from 'components/Icon';
import { useTranslate } from 'hooks/useTranslate';
import { castDraft } from 'immer';
import React from 'react';
import { useSelector } from 'react-redux';

import { selectCartIsLoaded, selectCartItems } from '../../redux/ducks/cart/selectors';
import styles from './CartDrawer.module.scss';

export interface CartDrawerProps {
  opened?: boolean;
  onClose: () => void;
  totalCount: number;
  totalPrice: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onClose, opened = false, totalPrice, totalCount }) => {
  const [isClicked, setIsClicked] = React.useState(false);
  const { currentLanguage, t, getTranslatedText } = useTranslate('cart');
  const items = useSelector(selectCartItems);
  const isLoaded = useSelector(selectCartIsLoaded);
  let cartContent: React.ReactNode = null;

  if (!isLoaded) {
    cartContent = (
      <div className={styles.cartProgressBar}>
        <CircularProgress color="secondary" size={40} />
      </div>
    );
  }

  if (isLoaded && !items.length) {
    cartContent = (
      <div className={styles.cartIsEmptyInfo}>
        <EmptyCartIcon />
        <Typography>{t('your-cart-is-empty')}</Typography>
        <Button onClick={onClose} variant="contained" color="secondary">
          {t('back-to-shopping')}
        </Button>
      </div>
    );
  }

  if (isLoaded && items.length) {
    cartContent = (
      <>
        <div className={styles.cardDetails}>
          <List classes={{ root: styles.cartList }}>
            {items.map((cartItem) => {
              return (
                <CartItem
                  key={cartItem.id}
                  id={cartItem.id}
                  name={getTranslatedText(cartItem, 'name')}
                  image={cartItem.image}
                  quantity={cartItem.quantity}
                  price={cartItem.price}
                  product={{ id: cartItem.product.id, type: cartItem.product.type, slug: cartItem.product.slug }}
                  // TODO: Fix type for readonly options
                  options={castDraft(cartItem.options)}
                  type={cartItem.product?.type}
                />
              );
            })}
          </List>
        </div>
        <div className={styles.cartBottom}>
          <b className={styles.cartBottomTotalCount}>
            {totalCount} {t('items')}
          </b>
          <Link href="/checkout">
            <a href="/checkout">
              <AddToCartButton
                onClick={(): void => setIsClicked(true)}
                isLoading={isClicked}
                disabled={isClicked}
                totalPrice={+totalPrice.toFixed(2)}
                textAED={t('aed')}
              >
                {t('checkout')}
              </AddToCartButton>
            </a>
          </Link>
        </div>
      </>
    );
  }

  return (
    <Drawer
      anchor={currentLanguage === 'ar' ? 'left' : 'right'}
      classes={{ paper: styles.cartPaper }}
      open={opened}
      onClose={onClose}
    >
      <div className={styles.cardRoot}>
        <div className={styles.cartHeader}>
          <h1>{t('my-order')}</h1>
          <IconButton data-test-id="cart-drawer-close-btn" className={styles.closeButton} onClick={onClose}>
            <Icon type="close" />
          </IconButton>
        </div>
        {cartContent}
      </div>
    </Drawer>
  );
};
