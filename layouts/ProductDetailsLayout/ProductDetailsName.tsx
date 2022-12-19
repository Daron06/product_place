import { Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';

import styles from './ProductDetailsLayout.module.scss';

interface ProductDetailsNameProps {
  title?: string;
  subTitle?: string;
  loading: boolean;
}

export const ProductDetailsName: React.FC<ProductDetailsNameProps> = ({
  title,
  subTitle,
  loading,
}): React.ReactElement => {
  return (
    <>
      <div className="mb-15">
        <Typography className={styles.productTitle} variant="h4">
          {loading ? <Skeleton variant="text" /> : title}
        </Typography>
      </div>
      <div className="mb-10">
        <Typography className={styles.productSubTitle} variant="subtitle2">
          {loading ? <Skeleton variant="text" /> : subTitle}
        </Typography>
      </div>
    </>
  );
};
