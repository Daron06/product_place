import { Rate } from 'components/pages/profile/tabs/OrderTab/Rate';
import { MainLayout } from 'layouts/MainLayout';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';

import { useTranslate } from '../../../../hooks/useTranslate';
import { IOrderItem, OrderApi } from '../../../../services/api/OrderApi';

interface OrderRateProps {
  item: IOrderItem;
}

const OrderRate: NextPage<OrderRateProps> = ({ item }) => {
  const { t } = useTranslate('profile');

  return (
    <MainLayout title={t('orders.rate-and-review')}>
      <Rate data={item} />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps<OrderRateProps> = async ({ query }) => {
  try {
    const id = query.id as string;
    const item = await OrderApi.getById(Number(id));
    const canRateStatus =
      item && item.status !== 'canceled' && item.status !== 'processing' && item.status !== 'declined';
    return canRateStatus
      ? {
          props: {
            item,
          },
        }
      : {
          props: {},
          redirect: {
            permanent: false,
            destination: '/',
          },
        };
  } catch (e) {
    console.error(e);
  }

  return {
    props: {},
    redirect: {
      permanent: false,
      destination: '/',
    },
  };
};

export default OrderRate;
