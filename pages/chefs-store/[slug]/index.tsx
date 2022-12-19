import { Container } from 'components/Container';
import { ChefStoreDetails } from 'components/pages/chefStoreDetails';
import { MainLayout } from 'layouts/MainLayout';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { Product } from 'redux/ducks/products/types/contracts';
import { Endpoints } from 'services/api/endpoints';
import { ProductsApi } from 'services/api/ProductsApi';
import { CategoryItem } from 'services/types';

interface ChefStoreDetailsPageProps {
  data: Product | null;
  recommendations?: Product[];
  categories?: CategoryItem[];
}

const ChefStoreDetailsPage: NextPage<ChefStoreDetailsPageProps> = ({ data, categories, recommendations }) => {
  return (
    <MainLayout title={data?.name} image={data?.media?.[0]?.url || data?.image} description={data?.description}>
      <Container>
        <ChefStoreDetails data={data} categories={categories} recommendations={recommendations} />
      </Container>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps<ChefStoreDetailsPageProps> = async ({ query }) => {
  try {
    const { categories } = await ProductsApi.directories(['categories']);
    const data = await ProductsApi.details(Endpoints.PRODUCT_CHEF_STORE, query.slug as string);
    const { items: recommendations } = await ProductsApi.getAll(Endpoints.PRODUCT_CHEF_STORE, {
      category_ids: [data.category.id],
      take: 20,
    });
    return {
      props: { data, categories, recommendations },
    };
  } catch (e) {
    console.error(e);
  }

  return { props: { data: null } };
};

export default ChefStoreDetailsPage;
