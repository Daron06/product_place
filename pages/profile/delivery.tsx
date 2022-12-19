import { DeliveryTab } from 'components/pages/profile/tabs/DeliveryTab';
import { ProfileLayout } from 'layouts/ProfileLayout';
import { NextPage } from 'next';
import React from 'react';
import { enhancedServerSideProps } from 'utils/enhancedServerSideProps';

const DeliveryPage: NextPage = (): React.ReactElement => {
  return (
    <ProfileLayout tabs="delivery">
      <DeliveryTab />
    </ProfileLayout>
  );
};

export const getServerSideProps = enhancedServerSideProps();

export default DeliveryPage;
