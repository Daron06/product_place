import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { FormField } from 'components/FormField';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import checkoutStyles from '../../pages/checkout/Checkout.module.scss';

export const SpecialInstructions: React.FC = (): React.ReactElement => {
  const { register } = useFormContext();

  const { t } = useTranslate('checkout');

  return (
    <Paper elevation={0} className="p-30">
      <div className="mb-20">
        <Typography className={clsx('fw-bold', checkoutStyles.blockTitle)} variant="h6">
          {t('special-instructions')}
        </Typography>
      </div>
      <div className="mb-20">
        <FormField label={t('special-instructions-hint')} name="instructions" register={register} textarea />
      </div>
    </Paper>
  );
};
