import { Badge } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCartData } from '../redux/ducks/cart/actionsCreators';
import { selectCartTotal } from '../redux/ducks/cart/selectors';
import { CartDrawerProps } from './CartDrawer';
import styles from './Header/Header.module.scss';
import { Icon } from './Icon';

const CartDrawer = dynamic<CartDrawerProps>(
  () => import(/* webpackChunkName: "CartDrawer" */ './CartDrawer').then((m) => m.CartDrawer),
  { ssr: false },
);

export const CartButton: React.FC<{ text?: string }> = ({ text }) => {
  const dispatch = useDispatch();
  const { totalCount, totalPrice } = useSelector(selectCartTotal);
  const [cartOpened, setCartOpened] = useState<boolean>(false);

  React.useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  return (
    <div>
      {!text ? (
        <IconButton
          data-test-id="header-cart-button"
          onClick={(): void => setCartOpened(true)}
          classes={{ root: styles.userProfileButton }}
          className={styles.cartIcon}
        >
          <Badge className="cart-badge" badgeContent={totalCount} color="primary">
            <Icon type="cart" height={23} width={20} viewBox={{ height: 24, width: 31 }} />
          </Badge>
        </IconButton>
      ) : (
        <div className={styles.bottomNavItem} onClick={(): void => setCartOpened(true)}>
          <Badge className="cart-badge" badgeContent={totalCount} color="primary">
            <Icon type="cart" height={23} width={20} viewBox={{ height: 24, width: 31 }} />
          </Badge>
          <span>{text}</span>
        </div>
      )}

      <CartDrawer
        totalCount={totalCount}
        totalPrice={totalPrice}
        opened={cartOpened}
        onClose={(): void => setCartOpened(false)}
      />
    </div>
  );
};
