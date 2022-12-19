import { OrderWillCanceledText } from 'components/OrderWillCanceledText';
import { PayNowButton } from 'components/PayNowButton';
import { Result } from 'components/Result';
import format from 'date-fns/format';
import Link from 'next/link';
import React from 'react';
import { IOrderItem } from 'services/api/OrderApi';

import { useTranslate } from '../../../../../hooks/useTranslate';
import ProfileOrderStatus from '../../ProfileOrderStatus';
import styles from './OrdersTab.module.scss';

interface IProfileOrders {
  items?: IOrderItem[];
  loading: boolean;
}

export const ProfileOrders: React.FC<IProfileOrders> = ({ items, loading = false }) => {
  const { t } = useTranslate('profile');

  if (loading && !items?.length) {
    return (
      <div className={styles.result}>
        <Result title={t('orders.nothing-here')} status="empty" />
      </div>
    );
  }

  return (
    <>
      {!!items?.length &&
        items?.map((item) => {
          const unpaidItem = item.status === 'pending';
          const createdDate = item.orders[0]?.createdAt ? new Date(item.orders[0]?.createdAt) : false;

          return (
            <div className={styles.order} key={item.id}>
              <Link href={`orders/${item.id}`}>
                <a href={`orders/${item.id}`}>
                  <div className={styles.topInfo}>
                    <div className={styles.ordersInfo}>
                      <p>{createdDate && format(createdDate, 'd MMM Y hh:mm a')}</p>
                      <span>
                        {item.orders.length > 1 ? t('orders.item.orders-id') : t('orders.item.order-id')}
                        {item.orders.map((el) => el.id).join(', #')}
                      </span>
                    </div>
                    <div className={styles.payInfo}>
                      <p>{t('orders.item.price', { params: { total: item.total } })}</p>
                    </div>
                  </div>

                  <div className={styles.botInfo}>
                    {!!item?.orders.length && (
                      <p>
                        {item.orders
                          .map((el) => el.products.map((element) => element.name))
                          .reduce((a, b) => a.concat(b))
                          .join(', ')}
                      </p>
                    )}
                    <div className={styles.status}>
                      <ProfileOrderStatus status={item.status} />
                    </div>
                  </div>
                </a>
              </Link>
              {unpaidItem && (
                <div className={styles.unpaidWr}>
                  <OrderWillCanceledText orderCreatedAt={createdDate} />
                  <div className={styles.PayBtnWr}>
                    <PayNowButton orderId={item.id} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
    </>
  );
};
