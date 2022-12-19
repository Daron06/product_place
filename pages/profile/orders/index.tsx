import { OrdersTab } from 'components/pages/profile/tabs/OrdersTab';
import { ProfileLayout } from 'layouts/ProfileLayout';
import { NextPage } from 'next';
import React from 'react';
import { enhancedServerSideProps } from 'utils/enhancedServerSideProps';

const OrdersPage: NextPage = (): React.ReactElement => {
  return (
    <ProfileLayout tabs="orders">
      <OrdersTab />
    </ProfileLayout>
  );
};
export const getServerSideProps = enhancedServerSideProps();
export default OrdersPage;
