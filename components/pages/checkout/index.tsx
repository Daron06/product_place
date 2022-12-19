import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import clsx from 'clsx';
import { BookingCount } from 'components/Checkout/BookingCount';
import { ChefTableMenuBlock } from 'components/Checkout/ChefTableMenuBlock';
import { ContactDetails } from 'components/Checkout/ContactDetails';
import { DeliveryAddress } from 'components/Checkout/DeliveryAddress';
import { PaymentMethod } from 'components/Checkout/PaymentMethod';
import { SpecialInstructions } from 'components/Checkout/SpecialInstructions';
import { OrderList } from 'components/pages/checkout/OrderList';
import { useTranslate } from 'hooks/useTranslate';
import { Immutable } from 'immer';
import { useRouter } from 'next/router';
import React from 'react';
import { Product } from 'redux/ducks/products/types/contracts';
import { User } from 'redux/ducks/user/types/state';

import { OrderSupplier } from '../../../pages/checkout';
import { Result } from '../../Result';
import { getAddress } from '../profile/tabs/OrderTab';
import styles from './Checkout.module.scss';

interface CheckoutProps {
  isBooking: boolean;
  isLoading: boolean;
  product?: Product;
  suppliers?: OrderSupplier[];
  user: Immutable<User> | null;
  toggleSavingAddress: () => void;
  isSavingAddress: boolean;
  isOnlineBooking: boolean;
  isChefLocationBooking: boolean;
  isRecorded?: boolean;
}

export const Checkout: React.FC<CheckoutProps> = ({
  isLoading,
  isChefLocationBooking,
  isBooking,
  product,
  suppliers,
  user,
  toggleSavingAddress,
  isSavingAddress,
  isOnlineBooking,
  isRecorded,
}) => {
  const cartIsEmpty = !suppliers || !suppliers.length;
  const router = useRouter();
  const { getTranslatedText, t } = useTranslate('checkout');

  if (!product) {
    return null;
  }

  return (
    <>
      <Paper elevation={0} className="p-30">
        <div
          className={clsx(
            !isBooking && 'd-flex flex-column',
            isBooking && `d-flex align-items-center justify-content-between ${styles.pr40}`,
          )}
        >
          {!cartIsEmpty && (
            <Typography className={clsx('fw-bold', styles.blockTitle)} variant="h6">
              {t('your-order')}
            </Typography>
          )}
          {isBooking ? (
            <div className={clsx('d-flex align-items-center', styles.mr50)}>
              {isLoading ? (
                <Skeleton variant="rect" style={{ width: 55, height: 55, borderRadius: 12 }} />
              ) : (
                <Avatar src={product?.chef?.image} style={{ width: 55, height: 55, borderRadius: 12 }} />
              )}
              <div className={clsx('d-flex flex-column', styles.ml15)}>
                {isLoading ? (
                  <>
                    <Skeleton variant="text" width="100px" />
                    <Skeleton variant="text" width="150px" />
                  </>
                ) : (
                  <>
                    <Typography>{getTranslatedText(product, 'name')}</Typography>
                    <Typography>
                      {t('by-chef')} {product?.chef?.name}
                    </Typography>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div>
              {!cartIsEmpty ? (
                <OrderList orders={suppliers} />
              ) : (
                <div className="pt-40 pb-40">
                  <Result title={t('your-cart-is-empty')} />
                </div>
              )}
            </div>
          )}
        </div>
      </Paper>
      {isChefLocationBooking && (
        <Paper elevation={0} className="p-30">
          <Typography className="fw-bold mb-10 d-flex align-items-center" variant="h6">
            <svg
              className="mr-10"
              width="14"
              height="18"
              viewBox="0 0 14 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 6.73529C13 9.90281 7 16 7 16C7 16 1 9.90281 1 6.73529C1 3.56778 3.68629 1 7 1C10.3137 1 13 3.56778 13 6.73529Z"
                stroke="#373737"
                strokeWidth="2"
              />
              <path
                d="M9.3077 6.73581C9.3077 7.95408 8.27451 8.94169 7 8.94169C5.7255 8.94169 4.69231 7.95408 4.69231 6.73581C4.69231 5.51753 5.7255 4.52993 7 4.52993C8.27451 4.52993 9.3077 5.51753 9.3077 6.73581Z"
                stroke="#373737"
                strokeWidth="2"
              />
            </svg>
            {t('where-will-be')}
          </Typography>
          {product?.address && getAddress(product?.address)}
        </Paper>
      )}
      {!isRecorded && isBooking && product && (
        <BookingCount
          count={product.additionalInfo?.countOfPeople}
          type={product.additionalInfo?.type ?? null}
          isPrivate={JSON.parse((router.query.is_private || '') as string)}
        />
      )}
      {product?.type === 'chefTable' && !!product?.menuOptions?.length && <ChefTableMenuBlock />}
      <ContactDetails />
      {!isOnlineBooking && (
        <DeliveryAddress user={user} toggleSavingAddress={toggleSavingAddress} isSavingAddress={isSavingAddress} />
      )}
      {!isBooking && <SpecialInstructions />}
      <PaymentMethod />
    </>
  );
};
