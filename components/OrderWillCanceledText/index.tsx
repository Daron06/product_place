import { format } from 'date-fns';
import React from 'react';

import { useTranslate } from '../../hooks/useTranslate';
import styles from './OrderWillCanceled.module.scss';

interface OrderWillCanceledTextProps {
  orderCreatedAt: false | Date;
}

export const OrderWillCanceledText: React.FC<OrderWillCanceledTextProps> = ({ orderCreatedAt }) => {
  const { t } = useTranslate('profile');
  const blockedTime = orderCreatedAt ? new Date(orderCreatedAt).setHours(orderCreatedAt.getHours() + 12) : false;

  return (
    <div className={styles.cancelTxt}>
      {t('orders.canceled-text')} <span>{blockedTime && format(blockedTime, 'hh:mm a')}</span>
    </div>
  );
};
