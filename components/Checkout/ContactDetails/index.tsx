import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import CustomPhoneInput from 'components/CustomPhoneInput';
import { FormField } from 'components/FormField';
import checkoutStyles from 'components/pages/checkout/Checkout.module.scss';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import styles from './ContactDetails.module.scss';

export const ContactDetails: React.FC = (): React.ReactElement => {
  const { errors, register } = useFormContext();
  const { t } = useTranslate('checkout');

  return (
    <Paper elevation={0} className="p-30">
      <div className="mb-20">
        <Typography className={clsx('fw-bold', checkoutStyles.blockTitle)} variant="h6">
          {t('contact-details')}
        </Typography>
      </div>
      <div className={styles.formGrid}>
        <FormField error={errors.firstName?.message} label={t('first-name')} name="firstName" register={register} />
        <FormField error={errors.lastName?.message} label={t('last-name')} name="lastName" register={register} />
      </div>
      <div className="mb-20">
        <FormField error={errors.email?.message} label={t('email')} name="email" register={register} />
      </div>
      <div className="mb-20">
        <CustomPhoneInput label={t('phone')} name="phone" />
      </div>
    </Paper>
  );
};
