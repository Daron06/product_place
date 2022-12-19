import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { Icon } from 'components/Icon';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';
import { useController, useFormContext } from 'react-hook-form';

import checkoutStyles from '../../pages/checkout/Checkout.module.scss';
import styles from './PaymentMethod.module.scss';

export const PaymentMethod: React.FC = (): React.ReactElement => {
  const { control, register } = useFormContext();

  const {
    field: { ref, onChange, value, name },
  } = useController({
    name: 'paymentMethod',
    control,
    defaultValue: 'Card',
  });

  React.useEffect(() => {
    register('paymentMethod');
  }, [register]);

  const { t } = useTranslate('checkout');

  return (
    <Paper elevation={0} className="p-30">
      <Typography className={clsx('fw-bold', checkoutStyles.blockTitle)} variant="h6">
        {t('payment-method')}
      </Typography>
      <div className="mt-20">
        <RadioGroup
          ref={ref}
          className={styles.radioGroup}
          name={name}
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
            onChange((event.target as HTMLInputElement).value)
          }
        >
          <FormControlLabel
            control={<Radio />}
            label={
              <div className={styles.block}>
                <div className="d-flex">
                  <Icon type="bank-cards" />
                  <Typography className={styles.label}>{t('credit-card')}</Typography>
                </div>
              </div>
            }
            value="Card"
          />
        </RadioGroup>
      </div>
    </Paper>
  );
};
