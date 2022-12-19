import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import { Icon } from 'components/Icon';
import { useTranslate } from 'hooks/useTranslate';
import Link from 'next/link';
import React from 'react';
import { CategoryItem } from 'services/types';

import styles from './CategoriesTop.module.scss';

interface CategoriesTopProps {
  categories: CategoryItem[];
}

export const CategoriesTop: React.FC<CategoriesTopProps> = ({ categories }) => {
  const noImage = '/static/no_image.svg';
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const { t, getTranslatedText } = useTranslate('chefs-store');

  return (
    <div className={styles.topCatsLayout}>
      <Typography className={styles.catsTitle} variant="h2" component="h2">
        {t('top-categories')}
      </Typography>
      <div className={styles.topCatsWrapper}>
        <div className={styles.topCatsOverflow}>
          <div className={styles.flexBlock}>
            {categories.slice(0, 5).map((item) => {
              return (
                <div className={styles.topCatItem} key={item.id}>
                  <Link key={item.id} href={`chefs-store?category_ids=${item.id}`}>
                    <a className={styles.catsLink} href={`chefs-store?category_ids=${item.id}`}>
                      <div className={clsx(styles.cardItemImage)}>
                        <img
                          className={imageLoaded ? styles.cardItemImageOpacity : undefined}
                          src={item.image ? `${item.image}?width=300&height=300` : noImage}
                          alt={item.name}
                          onLoad={(): void => setImageLoaded(true)}
                        />
                      </div>
                      <div className={styles.catName}>{getTranslatedText(item, 'name')} </div>
                      {item.children?.length > 0 && <Icon className={styles.arrow} type="arrow-down" />}
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
