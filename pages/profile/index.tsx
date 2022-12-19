import { SettingsTab } from 'components/pages/profile/tabs/SettingsTab';
import { ProfileLayout } from 'layouts/ProfileLayout';
import { NextPage } from 'next';
import React from 'react';

import { enhancedServerSideProps } from '../../utils/enhancedServerSideProps';

const ProfilePage: NextPage = (): React.ReactElement => {
  return (
    <ProfileLayout tabs="">
      <SettingsTab />
    </ProfileLayout>
  );
};

export const getServerSideProps = enhancedServerSideProps();

export default ProfilePage;
