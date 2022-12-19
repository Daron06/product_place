import { ChooseDate } from 'components/pages/chooseDate';
import { MainLayout } from 'layouts/MainLayout';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { Product } from 'redux/ducks/products/types/contracts';
import { Endpoints } from 'services/api/endpoints';
import { ProductsApi } from 'services/api/ProductsApi';

interface ChooseDatePageProps {
  data: Product;
}

const ChooseDatePage: NextPage<ChooseDatePageProps> = ({ data }): React.ReactElement => {
  return (
    <MainLayout title={data?.name} image={data?.image} description={data?.description}>
      <ChooseDate type="chefTable" initialData={data} />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps<ChooseDatePageProps> = async ({ query }) => {
  try {
    return { props: { data: await ProductsApi.details(Endpoints.PRODUCT_CHEF_TABLE, query.slug as string) } };
  } catch (error) {
    console.error('ChooseDatePage', error);
  }
  return { props: {}, redirect: { permanent: false, destination: '/' } };
};

export default ChooseDatePage;
