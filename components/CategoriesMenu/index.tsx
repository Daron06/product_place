import { useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';
import { CategoriesDrawer } from 'components/CategoriesDrawer';
import { CategoriesMenuList } from 'components/CategoriesMenuList';
import { Icon } from 'components/Icon';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';
import { CategoryItem } from 'services/types';

import styles from './CategoriesMenu.module.scss';

interface CategoriesMenuProps {
  categories: CategoryItem[];
  isDrawer?: boolean;
}

export const CategoriesMenu: React.FC<CategoriesMenuProps> = ({ categories, isDrawer = false }) => {
  const [catsDrawerOpened, setCatsDrawerOpened] = React.useState<boolean>(false);
  const { t } = useTranslate('chefs-store');

  const isMobile = useMediaQuery('(max-width:768px)');
  const [isMobileDrawer, seIsMobileDrawer] = React.useState<boolean>(false);

  React.useEffect(() => {
    seIsMobileDrawer(isMobile);
  }, [isMobile]);

  return (
    <div className={clsx(styles.catsWrapper, isDrawer && styles.isDrawer)}>
      {isDrawer || isMobileDrawer ? (
        <>
          <div
            className={clsx(styles.bottomNavItem, isMobileDrawer && styles.isMobileDrawer)}
            onClick={(): void => setCatsDrawerOpened(true)}
          >
            <Icon type="cats-drawer" height={16} width={16} viewBox={{ height: 16, width: 26 }} />
            <span className={styles.textSpan}>{t('categories')}</span>
            {isMobileDrawer && (
              <svg
                className={styles.arrow}
                width="8"
                height="13"
                viewBox="0 0 8 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.999999 1L7 6.5L1 12"
                  stroke="#373737"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <CategoriesDrawer
            categories={categories}
            opened={catsDrawerOpened}
            onClose={(): void => setCatsDrawerOpened(false)}
          />
        </>
      ) : (
        <CategoriesMenuList categories={categories} />
      )}
    </div>
  );
};
