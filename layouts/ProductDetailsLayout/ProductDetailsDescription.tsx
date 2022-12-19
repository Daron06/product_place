import Skeleton from '@material-ui/lab/Skeleton';
import clsx from 'clsx';
import React from 'react';

import styles from './ProductDetailsLayout.module.scss';

export const ProductDetailsDescription: React.FC<{ text; loading }> = ({ loading, text }): React.ReactElement => {
  return (
    <div className="mb-20">
      {loading ? (
        <Skeleton variant="text" />
      ) : (
        <div
          className={clsx('text-color-900', styles.description)}
          dangerouslySetInnerHTML={{
            __html: text || '',
          }}
        />
      )}
    </div>
  );
};
