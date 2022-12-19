import { useTranslate } from 'hooks/useTranslate';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import React from 'react';
import { Chef, Cuisine, Product } from 'redux/ducks/products/types/contracts';

import { Products } from '../../components/Products';
import { wrapper } from '../../redux/store';
import { Endpoints } from '../../services/api/endpoints';
import { ProductsApi } from '../../services/api/ProductsApi';
import { ProductQueryParams } from '../../services/types';
import { normalizeProductsParams } from '../../utils/normalizers/MenuParamsNormalizer';

interface MenuPageProps {
  chefs?: Chef[];
  cuisines?: Cuisine[];
  items: Product[];
  totalCount: number;
}

const MenuPage: NextPage<MenuPageProps> = ({ items, totalCount }) => {
  const { t } = useTranslate('menu');
  return (
    <MainLayout title={t('title')}>
      <Products
        title={t('title')}
        items={items}
        currentPage={1}
        totalCount={totalCount}
        filters={['cuisines', 'chefs', 'price']}
        searchPlaceholder={t('search-placeholder')}
        endpoint={Endpoints.PRODUCT_MENU}
      />
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  try {
    const params = normalizeProductsParams(ctx.query as Record<keyof ProductQueryParams, unknown>);
    const { items, meta } = await ProductsApi.getAll(Endpoints.PRODUCT_MENU, params);
    return {
      props: {
        items,
        totalCount: meta.total,
      },
    };
  } catch (error) {
    console.warn(error);
  }

  return { props: { items: [], totalCount: 0 } };
});

export default MenuPage;
