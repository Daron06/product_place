import { ChefsTableDetails } from 'components/pages/сhefsTableDetails';
import { MainLayout } from 'layouts/MainLayout';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { Product } from 'redux/ducks/products/types/contracts';
import { Endpoints } from 'services/api/endpoints';
import { ProductsApi } from 'services/api/ProductsApi';

interface ChefsTableDetailsPageProps {
  chefTableDetails: Product;
}

const ChefsTableDetailsPage: NextPage<ChefsTableDetailsPageProps> = ({ chefTableDetails }): React.ReactElement => {
  return (
    <MainLayout
      title={chefTableDetails?.name}
      image={chefTableDetails?.media?.[0].url}
      description={chefTableDetails?.description}
    >
      <ChefsTableDetails chefTableDetails={chefTableDetails} />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps<ChefsTableDetailsPageProps> = async ({ query }) => {
  try {
    return {
      props: { chefTableDetails: await ProductsApi.details(Endpoints.PRODUCT_CHEF_TABLE, query.slug as string) },
    };
  } catch (error) {
    console.error('ChefsTableDetailsPage', error);
    return { props: {}, redirect: { destination: '/', permanent: true } };
  }
};

export default ChefsTableDetailsPage;
