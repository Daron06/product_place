import { FormControlLabel } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { Checkbox } from 'components/Checkbox';
import { NewAddresses } from 'components/NewAddresses';
import checkoutStyles from 'components/pages/checkout/Checkout.module.scss';
import { useTranslate } from 'hooks/useTranslate';
import { Immutable } from 'immer';
import React from 'react';
import { User } from 'redux/ducks/user/types/state';

import { ChooseDeliveryAddress } from './ChooseDeliveryAddress';

export const DeliveryAddress: React.FC<{
  user: Immutable<User> | null;
  toggleSavingAddress: () => void;
  isSavingAddress: boolean;
}> = ({ user, toggleSavingAddress, isSavingAddress }) => {
  const { t } = useTranslate('checkout');
  return (
    <Paper elevation={0} className="p-30">
      <>
        <div className="mb-20">
          <Typography className={clsx('fw-bold', checkoutStyles.blockTitle)} variant="h6">
            {t('delivery-address')}
          </Typography>
        </div>
        {!!user?.addresses?.length && <ChooseDeliveryAddress />}
        <NewAddresses addImage={false} />
        {!!user && !user?.addresses?.length && (
          <div className="d-flex align-items-center">
            <FormControlLabel
              control={<Checkbox checked={isSavingAddress} onChange={toggleSavingAddress} />}
              value={isSavingAddress}
              label={t('save-address')}
            />
          </div>
        )}
      </>
    </Paper>
  );
};
