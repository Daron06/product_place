import { InputBase } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useDebounceEffect } from 'ahooks';
import clsx from 'clsx';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';
import { useDispatch } from 'react-redux';
import { OrderApi } from 'services/api/OrderApi';

import { useIsLoading } from '../../hooks/useIsLoading';
import { setSelectCartCoupon } from '../../redux/ducks/cart/actionsCreators';
import styles from './Coupon.module.scss';

interface CouponProps {
  discount?: number;
}

export const Coupon: React.FC<CouponProps> = React.memo(function Coupon({ discount }: CouponProps) {
  const [couponInputText, setCouponInputText] = React.useState<string>('');
  const [isSuccessCoupon, setIsSuccessCoupon] = React.useState<boolean>(false);
  const [isLoading, loading, loaded] = useIsLoading(false);
  const [couponResponseText, setCouponResponseText] = React.useState<string>('');
  const dispatch = useDispatch();

  const handleCouponText = (event: React.ChangeEvent<{ value: string }>): void => {
    const { value } = event.target;
    setCouponInputText(value);
  };

  const { t } = useTranslate('checkout');

  const couponTextTranslateArabic = (text: string): string => {
    if (text.includes('not found')) {
      return t('coupon-not-found');
    }
    if (text.includes('cannot be applied')) {
      return t('coupon-cannot-be-applied');
    }
    if (text.includes('Invalid')) {
      return t('coupon-invalid');
    }
    if (text.includes('Expired')) {
      return t('coupon-has-expired');
    }
    if (text.includes('Expired')) {
      return t('coupon-has-expired');
    }
    if (text.includes('active')) {
      return t('coupon-not-active');
    }
    return text;
  };

  React.useEffect(() => {
    const successDiscount = discount !== undefined && discount > 0 && isSuccessCoupon;
    if (successDiscount) {
      setIsSuccessCoupon(true);
      setCouponResponseText(t('coupon-success-applied'));
    }
  }, [discount, isSuccessCoupon]);

  useDebounceEffect(
    () => {
      const zeroDiscount = discount === 0 && isSuccessCoupon;
      if (zeroDiscount) {
        setIsSuccessCoupon(false);
        setCouponResponseText(t('coupon-not-apply-to-items'));
      }
    },
    [discount, isSuccessCoupon],
    { wait: 3000 },
  );

  const handleApply = async (): Promise<void> => {
    setCouponResponseText('');
    if (couponInputText) {
      try {
        loading();
        const data = await OrderApi.sendCoupon(encodeURI(couponInputText));
        const couponItem = 'value' in data ? { code: data.code, type: data.type, value: data.value } : null;
        if (couponItem) {
          dispatch(setSelectCartCoupon(couponItem));
          setIsSuccessCoupon(true);
        } else {
          setCouponResponseText(t('incorrect-coupon'));
          setIsSuccessCoupon(false);
        }
      } catch (error: any) {
        const { data } = error.response;
        setCouponResponseText(couponTextTranslateArabic(data.message));
        setIsSuccessCoupon(false);
      } finally {
        loaded();
      }
    }
  };

  return (
    <>
      <div className={clsx('mb-25', styles.couponWrapper)}>
        <div className={clsx('d-flex align-items-end justify-content-between', styles.groupTitle)}>
          <div className="">
            <span className={styles.couponLabel}>{t('promo-code')}</span>
            <InputBase
              className={clsx(!discount && couponResponseText.length ? styles.isError : '', styles.couponInput)}
              name="coupon"
              onChange={handleCouponText}
              value={couponInputText}
              disabled={isLoading || isSuccessCoupon}
            />
          </div>
          <Button
            color="primary"
            disabled={isLoading || isSuccessCoupon}
            onClick={handleApply}
            classes={{
              root: clsx(discount && couponResponseText.length ? styles.isSuccess : '', styles.button),
              label: styles.buttonLabel,
            }}
            variant="contained"
          >
            {t('apply')}
          </Button>
        </div>
        <span className={clsx(!isSuccessCoupon ? styles.isError : '', styles.couponInfo)}>{couponResponseText}</span>
      </div>
    </>
  );
});
