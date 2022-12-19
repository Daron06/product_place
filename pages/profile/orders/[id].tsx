import { OrderTab } from 'components/pages/profile/tabs/OrderTab';
import { ProfileLayout } from 'layouts/ProfileLayout';
import { NextPage } from 'next';
import React from 'react';
import { enhancedServerSideProps } from 'utils/enhancedServerSideProps';

const OrderPage: NextPage = () => {
  return (
    <ProfileLayout tabs="orders">
      <OrderTab />
    </ProfileLayout>
  );
};
export const getServerSideProps = enhancedServerSideProps();
export default OrderPage;
