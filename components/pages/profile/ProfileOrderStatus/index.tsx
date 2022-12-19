import clsx from 'clsx';
import React from 'react';

import { useTranslate } from '../../../../hooks/useTranslate';
import { OrderStatus } from '../../../../services/api/OrderApi';
import styles from './ProfileOrderStatus.module.scss';

interface ProfileOrderStatusProps {
  status: OrderStatus;
}

const ProfileOrderStatus: React.FC<ProfileOrderStatusProps> = ({ status }): React.ReactElement => {
  const { t } = useTranslate('profile');

  let statusLabelText = t(`orders.statuses.${status}`);

  if (status === 'pending') {
    statusLabelText = t('orders.statuses.waiting');
  } else if (status === 'aw.conf') {
    statusLabelText = t(t('status_aw_conf'));
  }

  return (
    <div className={styles.status}>
      <p
        className={clsx({
          pending: status === 'pending',
          processing: status === 'processing' || status === 'aw.conf',
          approved: status === 'approved' || status === 'completed',
          declined: status === 'declined' || status === 'canceled',
        })}
      >
        {statusLabelText}
      </p>
    </div>
  );
};

export default ProfileOrderStatus;
