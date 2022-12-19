import { FavoritesTab } from 'components/pages/profile/tabs/FavoritesTab';
import { ProfileLayout } from 'layouts/ProfileLayout';
import { NextPage } from 'next';
import React from 'react';
import { enhancedServerSideProps } from 'utils/enhancedServerSideProps';

const FavoritesPage: NextPage = (): React.ReactElement => {
  return (
    <ProfileLayout tabs="favorites">
      <FavoritesTab />
    </ProfileLayout>
  );
};

export const getServerSideProps = enhancedServerSideProps();
export default FavoritesPage;
