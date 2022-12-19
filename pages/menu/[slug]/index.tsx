import { Container } from 'components/Container';
import { MenuDetails } from 'components/pages/menuDetails';
import { MainLayout } from 'layouts/MainLayout';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { Product } from 'redux/ducks/products/types/contracts';
import { Endpoints } from 'services/api/endpoints';
import { ProductsApi } from 'services/api/ProductsApi';

interface MenuItemProps {
  data: Product | null;
}

const MenuItemPage: NextPage<MenuItemProps> = ({ data }): React.ReactElement => {
  return (
    <MainLayout title={data?.name} image={data?.media?.[0]?.url || data?.image} description={data?.description}>
      <Container>
        <MenuDetails initialMenuItem={data} />
      </Container>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps<MenuItemProps> = async ({ query }) => {
  try {
    return { props: { data: await ProductsApi.details(Endpoints.PRODUCT_MENU, query.slug as string) } };
  } catch (e) {
    console.error(e);
  }

  return { props: { data: null } };
};

export default MenuItemPage;
