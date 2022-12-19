import { MasterClassDetails } from 'components/pages/masterClassDetails';
import { MainLayout } from 'layouts/MainLayout';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { Product } from 'redux/ducks/products/types/contracts';
import { Endpoints } from 'services/api/endpoints';
import { ProductsApi } from 'services/api/ProductsApi';

interface MasterClassDetailsPageProps {
  data: Product;
}

const MasterClassDetailsPage: NextPage<MasterClassDetailsPageProps> = ({ data }) => {
  return (
    <MainLayout title={data?.name} image={data?.media?.[0].url} description={data?.description}>
      <MasterClassDetails data={data} />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps<MasterClassDetailsPageProps> = async ({ query }) => {
  try {
    return {
      props: {
        data: await ProductsApi.details(Endpoints.PRODUCT_MASTER_CLASSES, query.slug as string),
      },
    };
  } catch (error) {
    console.error(error);
  }
  return { props: {}, redirect: { destination: '/', permanent: true } };
};

export default MasterClassDetailsPage;
