import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import React from 'react';

import styles from './StatusInfo.module.scss';

interface StatusProps {
  loading?: boolean;
  type: string;
}
export const StatusInfo: React.FC<StatusProps> = ({ loading = false, type }) => {
  return (
    <div className={styles.status}>
      {loading ? (
        <CircularProgress className={styles.circleProgressColor} color="secondary" size={20} />
      ) : (
        <div className={clsx(styles.statusWrapper)}>
          <span className={clsx(styles.statusBlock, type, 'status')}>{type}</span>
        </div>
      )}
    </div>
  );
};
