import { Typography } from '@material-ui/core';
import { Icon } from 'components/Icon';
import React from 'react';

import styles from './ProductDetailsLayout.module.scss';

export const ProductDetailsLikeCount: React.FC = ({ children }): React.ReactElement => {
  return (
    <div className={styles.likeCount}>
      <span className={styles.likeCountIcon}>
        <Icon type="thumb-up" />
      </span>
      <Typography>{children}</Typography>
    </div>
  );
};
