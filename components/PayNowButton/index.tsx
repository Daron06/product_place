import Button from '@material-ui/core/Button';
import React from 'react';

import { useTranslate } from '../../hooks/useTranslate';
import styles from './PayNowButton.module.scss';

interface PayNowButtonProps {
  orderId: string;
}

export const PayNowButton: React.FC<PayNowButtonProps> = ({ orderId }) => {
  const { t } = useTranslate('profile');

  const handlePayNow = (): void => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('orderId', orderId);
      window.location.href = '/checkout/pay';
    }
  };

  return (
    <div className={styles.button}>
      <Button className={styles.PayNowBtn} onClick={(): void => handlePayNow()} color="secondary" variant="contained">
        {t('orders.pay-now-button')}
      </Button>
    </div>
  );
};
