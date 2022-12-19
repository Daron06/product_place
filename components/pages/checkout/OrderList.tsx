import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { CartItem } from 'components/CartItem';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';

import { OrderSupplier } from '../../../pages/checkout';
import styles from './Checkout.module.scss';

export const OrderList: React.FC<{ orders?: OrderSupplier[] }> = ({ orders }) => {
  const { getTranslatedText } = useTranslate();

  return (
    <>
      {orders?.map((supplier) => (
        <div key={supplier.id} className={styles.order}>
          <div className={styles.orderHead}>
            <Avatar className={styles.orderAvatar} src={supplier.image} />
            <Typography>{supplier.name}</Typography>
          </div>
          <ul className={`${styles.orderList} d-flex align-items-center flex-column`}>
            {supplier.items.map((cartItem) => (
              <CartItem
                classes={{
                  cartItemInfo: styles.cartItemInfo,
                }}
                key={cartItem.id}
                id={cartItem.id}
                name={getTranslatedText(cartItem.product, 'name')}
                image={cartItem.image}
                quantity={cartItem.quantity}
                price={cartItem.price}
                product={{ id: cartItem.product.id, type: cartItem.type, slug: cartItem.product.slug }}
                type={cartItem.type}
                options={cartItem.options}
              />
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};
