import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { Container } from 'components/Container';
import { CoverPhoto } from 'components/CoverPhoto';
import { BlogTab } from 'components/pages/chefsDetails/tabs/BlogTab';
import { ProductsTab } from 'components/pages/chefsDetails/tabs/ProductsTab';
import { TabPanel } from 'components/TabPanel';
import { useFavorite } from 'hooks/useFavorite';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Chef } from 'redux/ducks/products/types/contracts';
import { ProductsKindSearch } from 'services/types';

import { resetProducts } from '../../../redux/ducks/products/actionCreators';
import { ChefMainInfo } from './ChefMainInfo';
import styles from './ChefsDetails.module.scss';
import { MasterClassesTab } from './tabs/MasterClassesTab';

interface ChefDetailsProps {
  data: Chef;
}

const defaultImage =
  'https://images.squarespace-cdn.com/content/v1/5ba9a7f27a1fbd5e7ae65015/1538633167691-BDOFOHJ72TZAFHMLNG48/ke17ZwdGBToddI8pDm48kNog2gp6wmif_jyWH9y9XxoUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYy7Mythp_T-mtop-vrsUOmeInPi9iDjx9w8K4ZfjXt2dihngcNPo4NDcGg-Zx54fFk-u9REoN4UgyH0NRfD4YrcCjLISwBs8eEdxAxTptZAUg/Chefs-Kitchen.png';

const tabs: Record<keyof Chef['products'], string> = {
  menu: 'menu',
  recipe: 'recipes',
  chefStore: 'chefs-store',
  chefTable: 'chefs-table',
  masterClass: 'master-classes',
};

export const getFirstTab = (param: { [key in string]: unknown }): string => {
  const map = new Map(Object.entries(param));
  // eslint-disable-next-line no-restricted-syntax
  for (const paramKey in tabs) {
    if (map.get(paramKey)) {
      return tabs[paramKey];
    }
  }
  const firstTab = Object.keys(param)[0];
  return tabs[firstTab];
};

export const ChefsDetails: React.FC<ChefDetailsProps> = ({ data }): React.ReactElement => {
  const dispatch = useDispatch();
  const { t, getTranslatedText } = useTranslate('chefs-details');
  const { hasFavorite, toggleFavorite } = useFavorite('chef');
  const [activeTab, setActiveTab] = React.useState<string>(getFirstTab(data.products));

  const handleTabsChange = (_: unknown, newValue: string): void => {
    dispatch(resetProducts());
    setActiveTab(newValue);
  };

  const onClickFavorite = (): void => {
    if (data?.id) {
      toggleFavorite(Number(data?.id));
    }
  };

  React.useEffect(() => {
    return (): void => {
      dispatch(resetProducts());
    };
  }, [dispatch]);

  const isFavorite: boolean = !!data?.id && hasFavorite(Number(data?.id));

  const productTabs = [
    data?.products.menu && <Tab label={t('menu')} value="menu" />,
    data?.products.recipe && <Tab label={t('recipe')} value="recipes" />,
    data?.products.chefStore && <Tab label={t('chefStore')} value="chefs-store" />,
    data?.products.chefTable && <Tab label={t('chefTable')} value="chefs-table" />,
    data?.products.masterClass && <Tab label={t('masterClass')} value="master-classes" />,
  ].filter(Boolean);

  return (
    <div className={styles.page}>
      <CoverPhoto
        height="200px"
        loading={false}
        imageSrc={[
          data?.cover
            ? { id: data?.cover, name: data?.cover, url: data?.cover }
            : { id: defaultImage, name: defaultImage, url: defaultImage },
        ]}
      />
      <Container>
        <div className="pv-40">
          <ChefMainInfo
            isFavorite={isFavorite}
            avatar={data?.image}
            name={data?.name}
            jobRole={data?.jobRole}
            description={getTranslatedText(data, 'description')}
            workingExperience={data?.workingExperience}
            links={data?.links}
            onClickFavorite={onClickFavorite}
          />
          <Tabs
            TabIndicatorProps={{ children: <div className={styles.indicator} /> }}
            indicatorColor="primary"
            onChange={handleTabsChange}
            value={activeTab}
            className={styles.tabs}
            variant="scrollable"
          >
            {productTabs}
          </Tabs>
          <div className={styles.tabsContent}>
            <TabPanel active={activeTab} tab="menu">
              {data?.id && (
                <ProductsTab
                  chefId={Number(data?.id)}
                  kind={ProductsKindSearch.MENU}
                  pathToItemDetails="menu"
                  favoriteType="menu"
                />
              )}
            </TabPanel>
            <TabPanel active={activeTab} tab="recipes">
              <ProductsTab
                chefId={Number(data?.id)}
                kind={ProductsKindSearch.RECIPE}
                pathToItemDetails="recipes"
                favoriteType="recipe"
              />
            </TabPanel>
            <TabPanel active={activeTab} tab="chefs-store">
              <ProductsTab
                chefId={Number(data?.id)}
                kind={ProductsKindSearch.CHEF_STORE}
                pathToItemDetails="chefs-store"
                favoriteType="chefStore"
              />
            </TabPanel>
            <TabPanel active={activeTab} tab="chefs-table">
              <ProductsTab
                chefId={Number(data?.id)}
                kind={ProductsKindSearch.CHEF_TABLE}
                pathToItemDetails="chefs-table"
                favoriteType="chefTable"
              />
            </TabPanel>
            <TabPanel active={activeTab} tab="master-classes">
              <MasterClassesTab
                chefId={Number(data?.id)}
                kind={ProductsKindSearch.MASTER_CLASSES}
                pathToItemDetails="master-classes"
              />
            </TabPanel>
            <TabPanel active={activeTab} tab="blogPosts">
              <BlogTab />
            </TabPanel>
          </div>
        </div>
      </Container>
    </div>
  );
};
