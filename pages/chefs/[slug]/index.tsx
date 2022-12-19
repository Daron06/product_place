import { ChefsDetails, getFirstTab } from 'components/pages/chefsDetails';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import React from 'react';
import { setDirectories } from 'redux/ducks/directories/actionsCreators';
import { setFilters, setProductsKind } from 'redux/ducks/products/actionCreators';
import { wrapper } from 'redux/store';

import { Chef } from '../../../redux/ducks/products/types/contracts';
import { ChefApi } from '../../../services/api/ChefApi';
import { ProductsApi } from '../../../services/api/ProductsApi';
import { ProductsKindSearch } from '../../../services/types';

interface ChefDetailsPageProps {
  chefDetails: Chef;
}

const ChefsDetailsPage: NextPage<ChefDetailsPageProps> = ({ chefDetails }): React.ReactElement => {
  return (
    <MainLayout title={chefDetails.name} image={chefDetails.image} description={chefDetails.description}>
      <ChefsDetails data={chefDetails} />
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ query, store }) => {
  try {
    const chefDetails = await ChefApi.details(query.slug as string);
    const { chefs, cuisines, categories, suppliers } = await ProductsApi.directories([
      'chefs',
      'cuisines',
      'categories',
      'suppliers',
    ]);

    if (!chefDetails) {
      return {
        props: {},
        redirect: {
          destination: '/chefs',
          permanent: false,
        },
      };
    }

    if (chefDetails?.id) {
      store.dispatch(setFilters({ chef_ids: [Number(chefDetails.id)] }));
    }

    store.dispatch(setProductsKind(getFirstTab(chefDetails.products) as ProductsKindSearch));
    store.dispatch(setDirectories({ chefs, cuisines, categories, suppliers }));

    return {
      props: {
        chefDetails,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
});

export default ChefsDetailsPage;
