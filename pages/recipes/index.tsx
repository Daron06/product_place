import { Recipes } from 'components/pages/recipes';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import React from 'react';
import { Chef, Cuisine } from 'redux/ducks/products/types/contracts';

import { wrapper } from '../../redux/store';
import { ProductsKindSearch } from '../../services/types';
import { getProductsSSR } from '../../utils/getProductsSSR';

type RecipesPageProps = {
  chefs?: Chef[];
  cuisines?: Cuisine[];
};

const RecipesPage: NextPage<RecipesPageProps> = ({ chefs, cuisines }) => {
  return (
    <MainLayout title="Recipes">
      <Recipes chefs={chefs} cuisines={cuisines} />
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  try {
    return {
      props: await getProductsSSR({
        type: ProductsKindSearch.RECIPE,
        ctx,
        take: 50,
      }),
    };
  } catch (error) {
    console.warn(error);
  }

  return {
    props: {
      chefs: null,
      cuisines: null,
    },
  };
});

export default RecipesPage;
