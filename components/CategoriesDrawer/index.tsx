import { Drawer, IconButton } from '@material-ui/core';
import { CategoriesMenuList } from 'components/CategoriesMenuList';
import { Icon } from 'components/Icon';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';
import { CategoryItem } from 'services/types';

import styles from './CategoriesDrawer.module.scss';

export interface CategoriesDrawerProps {
  opened?: boolean;
  onClose: () => void;
  categories: CategoryItem[];
}

export const CategoriesDrawer: React.FC<CategoriesDrawerProps> = ({ onClose, opened = false, categories }) => {
  const { t } = useTranslate('chefs-store');

  return (
    <Drawer anchor={'left'} classes={{ paper: styles.cartPaper }} open={opened} onClose={onClose}>
      <div className={styles.cardRoot}>
        <div className={styles.cartHeader}>
          <h2>{t('categories')}</h2>
          <IconButton data-test-id="cart-drawer-close-btn" className={styles.closeButton} onClick={onClose}>
            <Icon type="close" />
          </IconButton>
        </div>
        <CategoriesMenuList categories={categories} isDrawer />
      </div>
    </Drawer>
  );
};
