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
      <ChooseDate type="masterClass" initialData={data} />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps<ChooseDatePageProps> = async ({ query }) => {
  try {
    return { props: { data: await ProductsApi.details(Endpoints.PRODUCT_MASTER_CLASSES, query.slug as string) } };
  } catch (error) {
    console.error('ChooseDatePage', error);
  }
  return {
    props: {},
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};

export default ChooseDatePage;
