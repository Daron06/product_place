import { Paper, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import clsx from 'clsx';
import { Coupon } from 'components/Coupon';
import { useAlert } from 'hooks/useAlert';
import { useTranslate } from 'hooks/useTranslate';
import styles from 'layouts/CheckoutLayout/CheckoutLayout.module.scss';
import { useRouter } from 'next/router';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { ProductType } from 'redux/ducks/favorites/types/contracts';
import { OrderApi, OrderSummaryResponse } from 'services/api/OrderApi';
import { UserApi } from 'services/api/UserApi';

import { CheckoutFormFields } from '../../../pages/checkout';
import { selectCartCouponCode } from '../../../redux/ducks/cart/selectors';
import { createAreaByName } from '../../../utils/normalizers/addressNormalizer';
import { responseErrorsNormalize } from '../../../utils/responseErrorsNormalize';
import { Button } from '../../Button';

type PaymentSummaryProps = Omit<OrderSummaryResponse, 'cart'> & {
  isSavingAddress: boolean;
  isLoading: boolean;
  isBooking: boolean;
  productId?: string | undefined;
  cartIsEmpty: boolean;
  dateId?: string;
  isRecorded: boolean;
  isOnlineBooking: boolean;
  productType?: ProductType;
};

const PAY_PATH = '/checkout/pay';
const CASH_PATH = '/checkout/status/cash';

type ProductAddress = {
  city: string;
  area: { code: string; name: string; cityCode: string };
  street: string;
  building: string;
  apartment: string;
  notes: string;
  lng: string;
  lat: string;
  zoom: number;
};

const productAddress = (
  isRecorded: boolean,
  isOnline: boolean,
  address: ProductAddress,
): ProductAddress | { type: string } => {
  if (isRecorded) {
    return { type: 'recorded' };
  }
  if (isOnline) {
    return { type: 'online' };
  }
  return address;
};

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  delivery,
  isBooking,
  isLoading,
  productId,
  summary,
  total,
  vat,
  cartIsEmpty,
  dateId,
  isSavingAddress,
  discount,
  isRecorded,
  isOnlineBooking,
  productType,
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const { handleSubmit, watch, setError } = useFormContext();
  const successCouponCode = useSelector(selectCartCouponCode);
  const paymentMethod = watch('paymentMethod');

  const guests = watch('guests').adults;
  const optionsQuantity = watch('options')?.reduce((prev, acc) => prev + acc.quantity, 0);
  const { openAlert } = useAlert();

  const onSubmit = async (fields: CheckoutFormFields): Promise<void> => {
    setIsSubmitting(true);
    window.localStorage.setItem('bookedProduct', JSON.stringify({ ...fields }));

    const cartToken = window.localStorage.getItem('cartToken');

    const orderData = {
      productId,
      token: productId ? null : cartToken,
      productDateId: dateId || null,
      options: fields.options || [],
      address: productAddress(isRecorded, isOnlineBooking, {
        city: fields.city,
        area: createAreaByName(isBooking ? '' : fields.area),
        street: fields.street,
        building: fields.building || '',
        apartment: fields.apartment || '',
        notes: fields.notes || '',
        lng: fields.location.lng || '',
        lat: fields.location.lat || '',
        zoom: fields.location.zoom || 1,
      }),
      contact: {
        firstName: fields.firstName,
        lastName: fields.lastName,
        email: fields.email,
        phone: String(fields.phone),
      },
      guests: fields.guests,
      date: new Date().toISOString(),
      paymentMethod: fields.paymentMethod,
      instructions: fields.instructions || '',
      coupon: successCouponCode || '',
    };

    try {
      const orderResponse = await OrderApi.createOrder(orderData);
      if (orderResponse.id) {
        window.localStorage.setItem('orderId', orderResponse.id);
        if (fields.paymentMethod === 'Card') {
          if (isBooking) {
            const { paymentOnline } = orderResponse;
            await router.push({
              pathname: paymentOnline ? PAY_PATH : `/checkout/status/${orderResponse.id}`,
              query: { type: router.query.type as string, product_id: productId, date_id: dateId },
            });
          } else {
            await router.push(PAY_PATH);
          }
        } else {
          await router.push(CASH_PATH);
        }
      }
    } catch (error) {
      const errors = error.response ? responseErrorsNormalize(error.response.data.errors) : [];
      if (errors.length) {
        errors.forEach((o) => {
          const field = o.field.split('.').pop();
          if (field) {
            setError(field, {
              type: 'manual',
              message: o.message,
            });
            openAlert(o.message, 'error');
          }
        });
      } else {
        openAlert('Error while creating order. Please try again later', 'error');
      }
      console.error(error);
      return;
    } finally {
      setIsSubmitting(false);
    }

    if (isSavingAddress) {
      const data = {
        city: { name: 'Dubai', code: 'dubai' },
        apartment: fields.apartment,
        area: createAreaByName(fields.area),
        instructions: fields.instructions,
        notes: fields.notes,
        street: fields.street,
        building: fields.building,
        zoom: fields.location.zoom || 1,
        lat: fields.location.lat || '0',
        lng: fields.location.lng || '0',
      };

      try {
        await UserApi.createAddress(data);
      } catch (error) {
        if (error?.response) {
          openAlert(error.response?.data.message, 'error');
        }
        console.error(error);
      }
    }
  };

  const { t } = useTranslate('checkout');

  return (
    <Paper className={styles.paymentSummary} elevation={0}>
      <Typography className={styles.blockTitle} variant="h6">
        {t('payment-summary')}
      </Typography>
      <Coupon discount={discount} />
      <ul className={`${styles.definitionList} d-flex flex-column mb-20`}>
        <li className="d-flex align-items-center justify-content-between">
          <Typography className={styles.term}>{t('order-summary')}</Typography>
          <Typography className={styles.definition}>
            {!isLoading ? (
              <div className={styles.arDirRtl}>
                <span>{t('aed')} </span>
                <span>{summary.toFixed(2)}</span>
              </div>
            ) : (
              <Skeleton animation="wave" variant="rect" width={70} height={17} />
            )}
          </Typography>
        </li>
        {!isBooking && (
          <li className="d-flex align-items-center justify-content-between">
            <Typography className={styles.term}>{t('delivery')}</Typography>
            <Typography className={styles.definition}>
              {!isLoading ? (
                <div className={styles.arDirRtl}>
                  <span>{t('aed')} </span>
                  <span>{delivery.toFixed(2)}</span>
                </div>
              ) : (
                <Skeleton animation="wave" variant="rect" width={55} height={17} />
              )}
            </Typography>
          </li>
        )}
        {successCouponCode && discount !== undefined && discount > 0 && (
          <li className={clsx('d-flex align-items-start justify-content-between', styles.discountBlock)}>
            <Typography className={styles.term}>{t('promo-code-discount')}</Typography>
            <Typography className={styles.definition}>
              {!isLoading ? (
                <div className={styles.arDirRtl}>
                  <span>{t('aed')} </span>
                  <span>{discount.toFixed(2)}</span>
                </div>
              ) : (
                <Skeleton animation="wave" variant="rect" width={55} height={17} />
              )}
            </Typography>
          </li>
        )}
        <li className="d-flex align-items-center justify-content-between">
          <Typography className={styles.term}>{t('VAT')}</Typography>
          <Typography className={styles.definition}>
            {!isLoading ? (
              <div className={styles.arDirRtl}>
                <span>{t('aed')} </span>
                <span>{vat.toFixed(2)}</span>
              </div>
            ) : (
              <Skeleton animation="wave" variant="rect" width={75} height={17} />
            )}
          </Typography>
        </li>

        <li className={`${styles.totalRow} d-flex align-items-center justify-content-between`}>
          <Typography className={styles.termTotal}>{t('total')}</Typography>
          <Typography className={styles.definitionTotal}>
            {!isLoading ? (
              <div className={styles.arDirRtl}>
                <span>{t('aed')} </span>
                <span>{total.toFixed(2)}</span>
              </div>
            ) : (
              <Skeleton animation="wave" variant="rect" width={85} height={17} />
            )}
          </Typography>
        </li>
      </ul>
      <Button
        loading={isLoading || isSubmitting}
        disabled={
          (!isBooking && cartIsEmpty) ||
          isLoading ||
          isSubmitting ||
          (productType === 'chefTable' && Number(optionsQuantity) !== guests)
        }
        onClick={handleSubmit(onSubmit)}
        color="secondary"
        size="large"
        variant="contained"
        fullWidth
      >
        {paymentMethod === 'Card' ? t('go-to-payment') : t('Order')}
      </Button>
    </Paper>
  );
};
