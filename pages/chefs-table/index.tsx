import { ChefsTable } from 'components/pages/chefsTable';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import React from 'react';
import { Chef } from 'redux/ducks/products/types/contracts';

import { wrapper } from '../../redux/store';
import { ProductsKindSearch } from '../../services/types';
import { getProductsSSR } from '../../utils/getProductsSSR';

interface ChefsTablePageProps {
  chefs?: Chef[];
}

const ChefsTablePage: NextPage<ChefsTablePageProps> = ({ chefs }): React.ReactElement => {
  return (
    <MainLayout title="Chef’s table">
      <ChefsTable chefs={chefs} />
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  try {
    return {
      props: await getProductsSSR({
        type: ProductsKindSearch.CHEF_TABLE,
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

export default ChefsTablePage;
