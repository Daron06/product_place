import { Container } from 'components/Container';
import { ChefsSection } from 'components/pages/home/ChefsSection';
import { ChefsTableSection } from 'components/pages/home/ChefsTableSection';
import styles from 'components/pages/home/Main.module.scss';
import { MasterClassSection } from 'components/pages/home/MasterClassSection';
import { TrendingunknownSection } from 'components/pages/home/TrendingunknownSection';
import { TrendingRecipesSection } from 'components/pages/home/TrendingRecipesSection';
import { MainLayout } from 'layouts/MainLayout';
import shuffle from 'lodash/shuffle';
import { GetStaticPropsResult, NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import { Chef, Product } from 'redux/ducks/products/types/contracts';
import { ProductsApi } from 'services/api/ProductsApi';

import type { MainSearchProps } from '../components/MainSearch';
import { MainSearchPlaceholder } from '../components/MainSearch/MainSearchPlaceholder';
import { TrendingStoreItemsSection } from '../components/pages/home/TrendingStoreItemsSection';
import { useTranslate } from '../hooks/useTranslate';
import { ProductsKindSearch } from '../services/types';
import { isDesktop, isTable } from '../utils/device';

const MainSearch = dynamic<MainSearchProps>(
  () => import(/* webpackChunkName: "MainSearch" */ 'components/MainSearch').then((m) => m.MainSearch),
  {
    ssr: true,
    // eslint-disable-next-line react/display-name
    loading: () => <MainSearchPlaceholder />,
  },
);

interface HomePageProps {
  chefTableItems: Product[] | null;
  chefStoreItems: Product[] | null;
  menuItems: Product[] | null;
  masterClasses: Product[] | null;
  recipesItems: Product[] | null;
  chefs: Chef[] | null;
}

export const TabsAvailableContext = React.createContext({} as { availableTabs: Array<ProductsKindSearch | undefined> });

const HomePage: NextPage<HomePageProps> = ({
  chefs,
  chefTableItems,
  chefStoreItems,
  menuItems,
  recipesItems,
  masterClasses,
}) => {
  const { t } = useTranslate('main');

  const availableTabs = [
    chefs?.length ? ProductsKindSearch.CHEFS : undefined,
    menuItems?.length ? ProductsKindSearch.MENU : undefined,
    recipesItems?.length ? ProductsKindSearch.RECIPE : undefined,
    chefTableItems?.length ? ProductsKindSearch.CHEF_TABLE : undefined,
    chefStoreItems?.length ? ProductsKindSearch.CHEF_STORE : undefined,
    masterClasses?.length ? ProductsKindSearch.MASTER_CLASSES : undefined,
  ];

  return (
    <MainLayout
      classes={{ header: styles.heroHeader }}
      title="Powered by Chefs"
      description="Food delivery. Recipe boxes. Masterclasses. Chef's tables. Groceries. Kitchenware"
    >
      <div className={styles.mainPage}>
        <div className={styles.hero}>
          <Container>
            <div className={styles.heroContainer}>
              <div className={styles.heroTitleWrapper}>
                <h1 className={styles.heroTitle}>{t('title')}</h1>
              </div>
              <p className={styles.heroText}>{t('subtitle')}</p>
            </div>
            <TabsAvailableContext.Provider value={{ availableTabs }}>
              {(isDesktop || isTable) && <MainSearch chefs={chefs} availableTabs={availableTabs} />}
            </TabsAvailableContext.Provider>
          </Container>
        </div>
        {chefs && <ChefsSection items={chefs} />}
        {menuItems && menuItems.length > 0 && <TrendingunknownSection items={menuItems} />}
        {recipesItems && <TrendingRecipesSection items={recipesItems} />}
        {chefTableItems && <ChefsTableSection items={chefTableItems} />}
        {chefStoreItems && <TrendingStoreItemsSection items={chefStoreItems} />}
        {masterClasses && masterClasses.length > 0 && <MasterClassSection items={masterClasses} />}
      </div>
    </MainLayout>
  );
};

export async function getServerSideProps(): Promise<GetStaticPropsResult<HomePageProps>> {
  try {
    const { chefs, recipes, menus, chefTables, chefStore, masterClasses } = await ProductsApi.directories([
      'chefs',
      'recipes',
      'menus',
      'chefTables',
      'chefStore',
      'masterClasses',
    ]);

    return {
      props: {
        menuItems: shuffle(menus as Product[]) ?? null,
        recipesItems: shuffle(recipes as Product[]) ?? null,
        chefTableItems: shuffle(chefTables as Product[]) ?? null,
        chefStoreItems: shuffle(chefStore as Product[]) ?? null,
        masterClasses: shuffle(masterClasses as Product[]) ?? null,
        chefs: shuffle(chefs) ?? null,
      },
    };
  } catch (error) {
    console.error('ERROR', error);
    return {
      props: {
        chefTableItems: null,
        menuItems: null,
        recipesItems: null,
        chefs: null,
        chefStoreItems: null,
        masterClasses: null,
      },
    };
  }
}

export default HomePage;
