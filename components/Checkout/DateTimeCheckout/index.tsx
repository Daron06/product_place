import { Paper } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { Icon } from 'components/Icon';
import React from 'react';

import checkoutStyles from '../../pages/checkout/Checkout.module.scss';

interface DateTimeCheckoutProps {
  isBooking: boolean;
}

export const DateTimeCheckout: React.FC<DateTimeCheckoutProps> = ({ isBooking }): React.ReactElement => {
  return (
    <Paper elevation={0} className="p-30">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex flex-column">
          <Typography className={clsx('fw-bold mb-10', checkoutStyles.blockTitle)} variant="h6">
            Date & time
          </Typography>
          <Typography className="fz-large-14 text-color-600">Schedule an order</Typography>
        </div>
        <div className="d-flex align-items-center">
          <div className="mr-50">
            <Typography className="fw-bold">Saterday, 19 Jul 2020</Typography>
            <Typography className="fz-large-14 text-color-600">23:00 − 00:00 (GST)</Typography>
          </div>
          {!isBooking && (
            <div className="ml-40">
              <IconButton color="secondary">
                <Icon type="launch" />
              </IconButton>
            </div>
          )}
        </div>
      </div>
    </Paper>
  );
};
