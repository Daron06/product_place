import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { TabPanel } from 'components/TabPanel';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from 'redux/ducks/user/selectors';
import { ProductsKindSearch } from 'services/types';

import { useTranslate } from '../../../../../hooks/useTranslate';
import { ProfileTabTitle } from '../../ProfileTabTitle';
import { FavoritesProductTab } from './FavoritesProductTab';
import styles from './FavoritesTab.module.scss';

export const FavoritesTab: React.FC = (): React.ReactElement => {
  const { t } = useTranslate('profile');
  const user = useSelector(selectUserData);
  const tabsArray = [
    { type: 'chefCount', label: t('favorites.tabs.chefs'), value: ProductsKindSearch.CHEFS },
    { type: 'menuCount', label: t('favorites.tabs.menu'), value: ProductsKindSearch.MENU },
    { type: 'recipeCount', label: t('favorites.tabs.recipes'), value: ProductsKindSearch.RECIPE },
    { type: 'chefTableCount', label: t('favorites.tabs.chefs-table'), value: ProductsKindSearch.CHEF_TABLE },
    { type: 'chefStoreCount', label: t('favorites.tabs.chefs-store'), value: ProductsKindSearch.CHEF_STORE },
    { type: 'masterClassCount', label: t('favorites.tabs.masterclasses'), value: ProductsKindSearch.MASTER_CLASSES },
  ];
  const filteredTabs = tabsArray.filter((item) => {
    return user ? user[item.type] : false;
  });

  const activeValue = filteredTabs.length ? filteredTabs[0].value : tabsArray[0].value;

  const [activeTab, setActiveTab] = React.useState<ProductsKindSearch>(activeValue);

  const handleTabsChange = (_: unknown, newValue: ProductsKindSearch): void => {
    setActiveTab(newValue);
  };

  return (
    <>
      <ProfileTabTitle value={t('favorites.title')} />
      <div className={styles.favorites}>
        <div className={styles.tabs}>
          <Tabs
            TabIndicatorProps={{ children: <div className={styles.indicator} /> }}
            indicatorColor="primary"
            onChange={handleTabsChange}
            value={activeTab}
            scrollButtons="on"
            variant="scrollable"
          >
            {filteredTabs.map((tab, index) => (
              <Tab key={index} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </div>

        <div className={styles.tabsContent}>
          <TabPanel active={activeTab} tab={ProductsKindSearch.RECIPE}>
            <FavoritesProductTab pathToItemDetails="recipes" favoriteType="recipe" />
          </TabPanel>
          <TabPanel active={activeTab} tab={ProductsKindSearch.CHEF_TABLE}>
            <FavoritesProductTab pathToItemDetails="chefs-table" favoriteType="chefTable" />
          </TabPanel>
          <TabPanel active={activeTab} tab={ProductsKindSearch.MENU}>
            <FavoritesProductTab pathToItemDetails="menu" favoriteType="menu" />
          </TabPanel>
          <TabPanel active={activeTab} tab={ProductsKindSearch.CHEFS}>
            <FavoritesProductTab pathToItemDetails="chefs" favoriteType="chef" />
          </TabPanel>
          <TabPanel active={activeTab} tab={ProductsKindSearch.CHEF_STORE}>
            <FavoritesProductTab pathToItemDetails="chefs-store" favoriteType="chefStore" />
          </TabPanel>
          <TabPanel active={activeTab} tab={ProductsKindSearch.MASTER_CLASSES}>
            <FavoritesProductTab pathToItemDetails="master-classes" favoriteType="masterClass" />
          </TabPanel>
        </div>
      </div>
    </>
  );
};
