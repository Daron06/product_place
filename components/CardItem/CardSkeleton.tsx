import { Skeleton } from '@material-ui/lab';
import React from 'react';

import styles from './CardItem.module.scss';

interface CardSkeletonProps {
  skeletonWidth?: number;
  isBlog?: boolean;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({ skeletonWidth, isBlog = false }): React.ReactElement => {
  const defaultWidth = isBlog ? 265 : 367;
  return (
    <div className={styles.skeletonCardItem} style={{ width: skeletonWidth || defaultWidth }}>
      <Skeleton variant="rect" width={367} height={200} />
      <div className="p-20">
        <Skeleton width="60%" />
        {isBlog && <Skeleton width="70%" />}
        {!isBlog && (
          <div className="d-flex align-items-center">
            <Skeleton width="60px" height={35} />
          </div>
        )}
        <Skeleton width="90%" />
        {!isBlog && (
          <div className="d-flex align-items-center justify-content-between" style={{ position: 'relative', top: 5 }}>
            <Skeleton width="20%" height={35} />
            <Skeleton width="40px" height="65px" className={styles.skeletonCardItemButton} />
          </div>
        )}
      </div>
    </div>
  );
};
