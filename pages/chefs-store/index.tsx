import { ChefsStore } from 'components/pages/chefsStore';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { Product } from 'redux/ducks/products/types/contracts';
import { Banner, CategoryItem, ProductQueryParams } from 'services/types';

import { ChefsStoreCategory } from '../../components/pages/chefsStore/ChefsStoreCategory';
import { wrapper } from '../../redux/store';
import { Endpoints } from '../../services/api/endpoints';
import { ProductsApi } from '../../services/api/ProductsApi';
import { normalizeProductsParams } from '../../utils/normalizers/MenuParamsNormalizer';

interface ChefsStorePageProps {
  totalCount: number;
  items: Product[];
  bestsellersItems: Product[];
  exlusiveItems: Product[];
  categories: CategoryItem[];
  topCategories: CategoryItem[];
  category_id?: string;
  banners: Banner[];
}

const ChefsStorePage: NextPage<ChefsStorePageProps> = ({
  items,
  bestsellersItems,
  exlusiveItems,
  totalCount,
  categories,
  topCategories,
  category_id,
  banners,
}) => {
  return (
    <MainLayout title="Chef’s store">
      {category_id ? (
        <ChefsStoreCategory items={items} categories={categories} totalCount={totalCount} />
      ) : (
        <ChefsStore
          items={items}
          bestsellersItems={bestsellersItems}
          exlusiveItems={exlusiveItems}
          categories={categories}
          topCategories={topCategories}
          totalCount={totalCount}
          banners={banners}
        />
      )}
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  try {
    const params = normalizeProductsParams(ctx.query as Record<keyof ProductQueryParams, unknown>);

    const { items, meta } = await ProductsApi.getAll(Endpoints.PRODUCT_CHEF_STORE, params);
    const { categories, topCategories, banners } = await ProductsApi.directories([
      'categories',
      'topCategories',
      'banners',
    ]);

    // TODO: Сделать получение всех продуктов для шеф-стора главной одним запросом потом
    // const { bestsellersItems, topCategories, exlusiveItems } = await ProductsApi.getChefStoreProducts();
    const { items: bestsellersItems } = await ProductsApi.getAll(Endpoints.CHEFS_STORE, {
      type: ['bestsellers'],
      take: 20,
    });
    const { items: exlusiveItems } = await ProductsApi.getAll(Endpoints.CHEFS_STORE, {
      type: ['exclusive-limited'],
      take: 20,
    });

    return {
      props: {
        items,
        categories,
        totalCount: meta.total,
        category_id: params.category_ids ? params.category_ids : null,
        bestsellersItems,
        exlusiveItems,
        topCategories,
        banners,
      },
    };
  } catch (error) {
    console.warn(error);
  }

  return { props: { categories: [], items: [], totalCount: 0 } };
});

export default ChefsStorePage;
