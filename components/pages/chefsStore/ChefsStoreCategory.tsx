import { CategoriesMenu } from 'components/CategoriesMenu';
import { useTranslate } from 'hooks/useTranslate';
import { useRouter } from 'next/router';
import React from 'react';
import { Product } from 'redux/ducks/products/types/contracts';
import { Endpoints } from 'services/api/endpoints';
import { CategoryItem, ProductsKindSearch } from 'services/types';

import { Products } from '../../Products';
import styles from './ChefStore.module.scss';

interface ChefsStoreCategoryProps {
  items: Product[];
  totalCount?: number;
  categories?: CategoryItem[];
}

export const ChefsStoreCategory: React.FC<ChefsStoreCategoryProps> = ({ categories, items }) => {
  const { t, getTranslatedText } = useTranslate('chefs-store');

  const { query } = useRouter();
  const activeCatId = query.category_ids as string;
  const allCategories = categories?.reduce((cats, next) => cats.concat(next.children), categories);
  const activeCategory = allCategories?.find((category) => category.id === Number(activeCatId));
  const activeCategoryTitle = activeCategory ? getTranslatedText(activeCategory, 'name') : '';

  const breadcrumbs = [
    { title: t('home'), url: '/' },
    { title: t('chefs-store'), url: '/chefs-store' },
  ];

  if (activeCategoryTitle) {
    breadcrumbs.push({ title: activeCategoryTitle, url: '' });
  }

  return (
    <>
      <div className={styles.fullContainer}>
        {categories && <CategoriesMenu categories={categories} />}
        <Products
          title={t('chefs-store')}
          categoryTitle={activeCategoryTitle}
          breadcrumbs={breadcrumbs}
          items={items}
          filters={['suppliers', 'chefs', 'price']}
          searchPlaceholder={'Search...'}
          endpoint={Endpoints.PRODUCT_CHEF_STORE}
          directories={{ categories }}
          layoutStyles={{
            container: false,
            width: '100%',
          }}
          productType={ProductsKindSearch.CHEF_STORE}
        />
      </div>
    </>
  );
};
