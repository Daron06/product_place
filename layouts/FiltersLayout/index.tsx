import clsx from 'clsx';
import React from 'react';

import styles from './FiltersLayout.module.scss';

interface FiltersLayoutProps {
  leftFilters?: React.ReactElement;
  rightFilters?: React.ReactElement;
}

export const FiltersLayout: React.FC<FiltersLayoutProps> = ({ leftFilters, rightFilters }): React.ReactElement => {
  return (
    <div className={clsx('align-items-center justify-content-between mb-50', styles.filtersWrapper)}>
      {leftFilters && <div className={styles.filtersList}>{leftFilters}</div>}
      {rightFilters}
    </div>
  );
};
