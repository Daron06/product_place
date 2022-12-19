import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { PeopleCounter } from 'components/PeopleCounter';
import { useTranslate } from 'hooks/useTranslate';
import { useRouter } from 'next/router';
import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { ProductsApi } from 'services/api/ProductsApi';

import { useAlert } from '../../../hooks/useAlert';
import { ProductLocationType } from '../../../redux/ducks/products/types/contracts';
import checkoutStyles from '../../pages/checkout/Checkout.module.scss';
import styles from './BookingCount.module.scss';

interface BookingCountProps {
  count?: number | undefined;
  type: ProductLocationType | null;
  isPrivate: boolean;
}

export const BookingCount: React.FC<BookingCountProps> = ({ type, isPrivate }): React.ReactElement => {
  const router = useRouter();
  const { openAlert } = useAlert();
  const [maxSizeAchieved, setMaxSizeAchieved] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [possibleToPrivateBook, setPossibleToPrivateBook] = React.useState(false);
  const { control, register, setValue, watch } = useFormContext();
  const { t } = useTranslate('checkout');
  const {
    field: { ref, onChange: onPrivatGroupSwitchChange, value: privateGroupSwitchValue, name },
  } = useController({
    name: 'isPrivateGroup',
    control,
    defaultValue: isPrivate,
  });
  const dateId = router.query.date_id as string;
  const productSlug = router.query.product_id as string;
  const productType = router.query.type as string;
  const guestsWatched = watch('guests');

  React.useEffect(() => {
    (async (): Promise<void> => {
      try {
        const data = await ProductsApi.dates(
          { type: `product/${productType}`, slug: productSlug },
          {
            ids: dateId,
          },
        );
        setPossibleToPrivateBook(Number(data[0].booked) === 0);
        setCount(Number(data[0]?.countOfPeople) - Number(data[0]?.booked));
      } catch (err) {
        console.warn('Fetch product dates', err);
        openAlert('Error loading product details');
      }
    })();
  }, [productType, productSlug, dateId]);

  React.useEffect(() => {
    register('guests.adults');
    register('isPrivateGroup');
  }, [register]);

  React.useEffect(() => {
    if (isPrivate) {
      setValue('guests.adults', count);
      setMaxSizeAchieved(true);
    }
  }, [isPrivate, count]);

  const handleCountOfPeopleChange = (data: { [k: string]: number }): void => {
    const currentCount = Number(data.adults);

    setValue('guests.adults', data.adults);

    if (currentCount === count) {
      setMaxSizeAchieved(true);
    } else {
      setMaxSizeAchieved(false);
    }
  };

  const handlePrivateGroup = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onPrivatGroupSwitchChange(event.currentTarget.checked);
    if (event.currentTarget.checked) {
      setValue('guests.adults', count && count);
      setMaxSizeAchieved(true);
    } else {
      setValue('guests.adults', 1);
      setMaxSizeAchieved(false);
    }
  };

  return (
    <Paper elevation={0} className="p-30">
      <Typography className={clsx('fw-bold mb-10', checkoutStyles.blockTitle)} variant="h6">
        {t('people-count-title')}
      </Typography>
      <div>
        {maxSizeAchieved && (
          <Typography variant="caption" data-testid="maxCapacityMsg">
            {t('max-capacity-alert')}
          </Typography>
        )}
        <PeopleCounter
          guests={guestsWatched}
          maxCount={count}
          classes={{ root: styles.counterItem }}
          onChange={handleCountOfPeopleChange}
          plusDisabled={maxSizeAchieved}
          minusDisabled={privateGroupSwitchValue}
        />
        {type === 'at-restaurant' && possibleToPrivateBook && (
          <div className="d-flex align-items-center pt-30 justify-content-between">
            <div>
              <Typography className="fw-bold">{t('private-group-title')}</Typography>
              <Typography variant="caption">{t('private-group-description')}</Typography>
            </div>
            <Switch
              checked={privateGroupSwitchValue}
              ref={ref}
              color="secondary"
              onChange={handlePrivateGroup}
              name={name}
              data-testid="privateGroup"
            />
          </div>
        )}
      </div>
    </Paper>
  );
};
