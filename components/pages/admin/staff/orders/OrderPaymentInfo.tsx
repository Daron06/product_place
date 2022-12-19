import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { Icon } from 'components/Icon';
import React from 'react';

import styles from './StaffOrderDetails.module.scss';

export const OrderPaymentInfo: React.FC<{ method?: string; status?: string }> = ({
  method,
  status,
}): React.ReactElement => {
  enum PaymentIconTypeProps {
    approved = 'success-bold',
    processing = 'processing',
    declined = 'declined',
  }
  const getStatusIconType = (statusType: string): PaymentIconTypeProps => {
    const statusTypes: Record<string, { icon: PaymentIconTypeProps }> = {
      approved: {
        icon: PaymentIconTypeProps.approved,
      },
      processing: {
        icon: PaymentIconTypeProps.processing,
      },
      declined: {
        icon: PaymentIconTypeProps.declined,
      },
    };
    return statusTypes[statusType] ? statusTypes[statusType].icon : PaymentIconTypeProps.processing;
  };

  return (
    <Paper elevation={0} className="p-20">
      <Typography className="fw-bold fz-large-18 mb-20">Payment information</Typography>
      <ul>
        <li className="d-flex align-items-center justify-content-between">
          <Typography className="text-color-600 fz-large-14">Payment method</Typography>
          <span className="d-flex align-items-center">
            <Icon type={method === 'Card' ? 'bank-cards' : 'cash'} />
            <Typography className="fz-large-14 ml-10">{method === 'Card' ? 'Credit Card' : 'Cash'}</Typography>
          </span>
        </li>
        <Divider className="mt-15 mb-15" />
        <li className="d-flex align-items-center justify-content-between">
          <Typography className="text-color-600 fz-large-14">Payment status</Typography>
          <span className="d-flex align-items-center">
            {status && (
              <>
                <Icon type={getStatusIconType(status)} />
                <span className={clsx('fz-large-14 fw-bold ml-10', styles.statusText)}>{status}</span>
              </>
            )}
          </span>
        </li>
      </ul>
    </Paper>
  );
};
