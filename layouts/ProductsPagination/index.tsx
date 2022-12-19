import { Typography } from '@material-ui/core';
import { Pagination } from 'components/Pagination';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';

import styles from './ProductsPagination.module.scss';

interface ProductsPaginationProps {
  currentPage: number;
  currentCount: number;
  onPaginate: (number: number) => void;
  totalCount: number;
  takeCount: number;
  loading?: boolean;
}

export const ProductsPagination: React.FC<ProductsPaginationProps> = ({
  currentPage,
  currentCount,
  onPaginate,
  totalCount,
  takeCount,
}): React.ReactElement => {
  const showing = takeCount * currentPage - takeCount;
  const { t } = useTranslate('pagination');
  return (
    <div className={`${styles.pagination} d-flex align-items-center justify-content-between`}>
      <Pagination pageCount={Math.ceil(totalCount / takeCount)} currentPage={currentPage} goToPage={onPaginate} />

      <Typography variant="subtitle1">
        {t('showing')} {showing < 1 ? 1 : showing}-{showing + currentCount} {t('of')} {totalCount} {t('results')}
      </Typography>
    </div>
  );
};
