import { NotificationTab } from 'components/pages/profile/tabs/NotificationTab';
import { ProfileLayout } from 'layouts/ProfileLayout';
import { NextPage } from 'next';
import React from 'react';
import { enhancedServerSideProps } from 'utils/enhancedServerSideProps';

const NotificationPage: NextPage = (): React.ReactElement => {
  return (
    <ProfileLayout tabs="notification">
      <NotificationTab />
    </ProfileLayout>
  );
};
export const getServerSideProps = enhancedServerSideProps();
export default NotificationPage;
