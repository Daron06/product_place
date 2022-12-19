import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import clsx from 'clsx';
import React from 'react';

import { useTranslate } from '../../hooks/useTranslate';
import { TabsAvailableContext } from '../../pages';
import { ProductsKindSearch } from '../../services/types';
import { Button } from '../Button';
import searchStyles from '../Search/Search.module.scss';
import styles from './MainSearch.module.scss';

export const MainSearchPlaceholder: React.FC = () => {
  const { t } = useTranslate('main-search');
  const { t: searchTranslate } = useTranslate('search');
  const { availableTabs } = React.useContext(TabsAvailableContext);

  return (
    <div className={clsx('MuiPaper-root MuiPaper-elevation1 MuiPaper-rounded', styles.mainSearch)}>
      <Tabs TabIndicatorProps={{ children: <div className={styles.indicator} /> }} indicatorColor="primary">
        {availableTabs?.includes(ProductsKindSearch.CHEFS) && (
          <Tab label={t('chefs')} value={ProductsKindSearch.CHEFS} />
        )}
        {availableTabs?.includes(ProductsKindSearch.MENU) && (
          <Tab label={t('delivery-menu')} value={ProductsKindSearch.MENU} />
        )}
        {availableTabs?.includes(ProductsKindSearch.RECIPE) && (
          <Tab label={t('recipe-boxes')} value={ProductsKindSearch.RECIPE} />
        )}
        {availableTabs?.includes(ProductsKindSearch.CHEF_STORE) && (
          <Tab label={t('chefs-store')} value={ProductsKindSearch.CHEF_STORE} />
        )}
        {availableTabs?.includes(ProductsKindSearch.CHEF_TABLE) && (
          <Tab label={t('chefs-table')} value={ProductsKindSearch.CHEF_TABLE} />
        )}
        {availableTabs?.includes(ProductsKindSearch.MASTER_CLASSES) && (
          <Tab label={t('masterclasses')} value={ProductsKindSearch.MASTER_CLASSES} />
        )}
      </Tabs>
      <form>
        <div className={clsx('Search_root__x7mZM', styles.searchRoot)}>
          <div className={searchStyles.multipleList}>
            <div className={styles.filterItem} style={{ display: 'flex' }}>
              <p className={clsx('MuiTypography-root MuiTypography-body2', styles.blockTitle)}>Category</p>
              <div
                className={clsx('MuiButtonBase-root MuiChip-root MuiChip-clickable', styles.chip)}
                tabIndex={0}
                role="button"
                data-test-id="chip_Select"
              >
                <span className={clsx('MuiChip-label', styles.chipLabel)}>Select</span>
                <span className="MuiTouchRipple-root" />
              </div>
            </div>
          </div>
          <div className="Button_button__3-u4P">
            <Button
              color="primary"
              classes={{ root: searchStyles.buttonSearch }}
              size="large"
              type="submit"
              variant="contained"
            >
              <span className={searchStyles.searchButtonText}>{searchTranslate('search')}</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
