import { Container } from 'components/Container';
import { RecipeDetails } from 'components/pages/recipeDetails';
import { MainLayout } from 'layouts/MainLayout';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { Product } from 'redux/ducks/products/types/contracts';
import { Endpoints } from 'services/api/endpoints';
import { ProductsApi } from 'services/api/ProductsApi';

interface RecipeDetailsPageProps {
  data: Product | null;
}

export const RecipeDetailsPage: NextPage<RecipeDetailsPageProps> = ({ data }): React.ReactElement => {
  return (
    <MainLayout title={data?.name} image={data?.media?.[0]?.url || data?.image} description={data?.description}>
      <Container>
        <RecipeDetails initialRecipeDetails={data} />
      </Container>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps<RecipeDetailsPageProps> = async ({ query }) => {
  try {
    return {
      props: { data: await ProductsApi.details(Endpoints.PRODUCT_RECIPES, query.slug as string) },
    };
  } catch (e) {
    console.error(e);
  }

  return { props: { data: null } };
};

export default RecipeDetailsPage;
