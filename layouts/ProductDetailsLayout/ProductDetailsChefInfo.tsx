import Avatar from '@material-ui/core/Avatar';
import Skeleton from '@material-ui/lab/Skeleton';
import { useTranslate } from 'hooks/useTranslate';
import Link from 'next/link';
import React from 'react';

import styles from './ProductDetailsLayout.module.scss';

interface ProductDetailsChefInfoProps {
  avatar?: string;
  name: string;
  description: string;
  loading: boolean;
  slug: string;
}

export const ProductDetailsChefInfo: React.FC<ProductDetailsChefInfoProps> = ({
  avatar,
  slug,
  name,
  description,
  loading,
}): React.ReactElement => {
  const { t } = useTranslate('product-details');
  return (
    <div className="d-flex mt-30">
      <div className="mr-15">
        {loading ? (
          <Skeleton animation="wave" variant="circle" width={67} height={67} />
        ) : (
          <Link href={`/chefs/${slug}`}>
            <a href={`/chefs/${slug}`}>
              <Avatar alt={name} classes={{ root: styles.avatar }} src={avatar} />
            </a>
          </Link>
        )}
      </div>
      <div className="d-flex flex-column">
        {loading ? (
          <>
            <Skeleton variant="text" width={50} />
            <Skeleton variant="text" width={80} />
            <Skeleton variant="text" width={200} />
          </>
        ) : (
          <>
            <Link href={`/chefs/${slug}`}>
              <a href={`/chefs/${slug}`} className="d-contents">
                <span className={styles.chefSign}>{t('by-chef')}</span>
                <span className={styles.chefName}>{name}</span>
              </a>
            </Link>
            <span className={`${styles.chefSign} mt-10`}>{description}</span>
          </>
        )}
      </div>
    </div>
  );
};
