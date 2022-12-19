import { MasterClasses } from 'components/pages/masterClasses';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import React from 'react';
import { Chef } from 'redux/ducks/products/types/contracts';

import { wrapper } from '../../redux/store';
import { ProductsKindSearch } from '../../services/types';
import { getProductsSSR } from '../../utils/getProductsSSR';

interface MasterClassesPageProps {
  chefs?: Chef[];
}

const MasterClassesPage: NextPage<MasterClassesPageProps> = ({ chefs }): React.ReactElement => {
  return (
    <MainLayout title="Master classes">
      <MasterClasses chefs={chefs} />
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  try {
    return {
      props: await getProductsSSR({
        type: ProductsKindSearch.MASTER_CLASSES,
        ctx,
        take: 50,
        directories: ['chefs'],
      }),
    };
  } catch (error) {
    console.warn(error);
  }

  return {
    props: {
      chefs: null,
    },
  };
});

export default MasterClassesPage;
