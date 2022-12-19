import { Chefs } from 'components/pages/chefs';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import React from 'react';
import { setChefs, setChefsTotalCount } from 'redux/ducks/chefs/actionCreators';
import { ChefApi } from 'services/api/ChefApi';

import { wrapper } from '../../redux/store';

const ChefsPage: NextPage = () => {
  return (
    <MainLayout title="Chefs">
      <Chefs />
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  try {
    const { items, meta } = await ChefApi.getAll({ ...ctx.query, take: 50 });
    ctx.store.dispatch(setChefsTotalCount(meta.total));
    ctx.store.dispatch(setChefs(items));
  } catch (error) {
    console.error('ChefsPage', error);
  }
});

export default ChefsPage;
