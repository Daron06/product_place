import { Typography } from '@material-ui/core';
import { GoToLink } from 'components/GoToLink';
import { Icon } from 'components/Icon';
import React from 'react';

import styles from './ProductDetailsLayout.module.scss';

interface ProductDetailsAttentionProps {
  chefName: string;
  productLink: string;
}

export const ProductDetailsAttention: React.FC<ProductDetailsAttentionProps> = ({
  chefName,
  productLink,
}): React.ReactElement => {
  return (
    <div className="mb-20">
      <div className={styles.productAttentionInner}>
        <div className={styles.masterClassIcon}>
          <Icon type="video-yellow" />
        </div>
        <div className={styles.masterClassInfo}>
          <div className="mb-10">
            <Typography className={styles.masterClassTitle}>Master Class</Typography>
          </div>
          <div className="mb-10">
            <Typography className={styles.masterClassText}>
              Participate in the online experience of cooking this recipe with chef {chefName}
            </Typography>
          </div>
          <div className={styles.masterClassGoTo}>
            <GoToLink href={`/master-classes/${productLink}`} text="Go to Experience" />
          </div>
        </div>
      </div>
    </div>
  );
};
