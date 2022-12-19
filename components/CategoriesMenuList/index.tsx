import { Avatar, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { Icon } from 'components/Icon';
import { useTranslate } from 'hooks/useTranslate';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { CategoryItem } from 'services/types';

import styles from './CategoriesMenuList.module.scss';

interface CategoriesMenuListProps {
  categories: CategoryItem[];
  isDrawer?: boolean;
}

export const CategoriesMenuList: React.FC<CategoriesMenuListProps> = ({ categories, isDrawer }) => {
  const { query } = useRouter();
  const activeCatId = query.category_ids;

  const { t, getTranslatedText } = useTranslate('chefs-store');

  return (
    <div className={styles.catsWrapper}>
      {!isDrawer && (
        <Typography className={styles.sidebarTitle} variant="h4" component="h4">
          {t('categories')}
        </Typography>
      )}

      <ul className={styles.parentUl}>
        {categories.map((item) => {
          const isActive =
            String(activeCatId) === String(item.id) || !!item.children?.find((c) => c.id === Number(activeCatId));
          return (
            <li key={item.id} className={clsx({ [styles.active]: isActive })}>
              <Link key={item.id} href={`/chefs-store?category_ids=${item.id}`}>
                <a className={styles.catsLink} href={`/chefs-store?category_ids=${item.id}`}>
                  <Avatar
                    alt={item.name}
                    style={{ height: 36, width: 36 }}
                    classes={{ root: styles.avatar }}
                    src={item.image}
                  />
                  <span>{getTranslatedText(item, 'name')} </span>
                  {item.children?.length > 0 && <Icon className={styles.arrow} type="arrow-down" />}
                </a>
              </Link>
              {item.children?.length > 0 && (
                <ul className={styles.subUl}>
                  {item.children?.map((child) => (
                    <li key={child.id}>
                      <Link key={child.id} href={`chefs-store?category_ids=${child.id}`}>
                        <a
                          className={clsx(
                            { [styles.active]: String(activeCatId) === String(child.id) },
                            styles.catsLink,
                          )}
                          href={`chefs-store?category_ids=${child.id}`}
                        >
                          {getTranslatedText(child, 'name')}
                          <span />
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
