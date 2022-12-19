import ButtonBase from '@material-ui/core/ButtonBase';
import clsx from 'clsx';
import React from 'react';

import styles from './Pagination.module.scss';
import { usePagination } from './usePagination';

interface PaginationProps {
  color?: 'primary' | 'white';
  className?: string;
  pageCount: number;
  currentPage: number;
  goToPage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  color = 'primary',
  className = '',
  currentPage,
  pageCount,
  goToPage,
}) => {
  const pages = usePagination(currentPage, pageCount);

  const goToPreviousPage = currentPage === 1 ? undefined : (): void => goToPage(currentPage - 1);
  const goToNextPage = currentPage === pageCount ? undefined : (): void => goToPage(currentPage + 1);

  const rootCls = clsx(styles.paginroot, className);
  const activeCls = `active${color.charAt(0).toUpperCase() + color.slice(1).toLowerCase()}`;

  return (
    <div className={rootCls} data-test-id="pagination">
      <ul className="d-flex align-items-center justify-content-center">
        <li
          className={clsx(styles.item, styles.previous, {
            [styles.disable]: currentPage === 1,
          })}
        >
          <ButtonBase classes={{ root: styles.button }} onClick={goToPreviousPage} data-test-id="pagination-prev">
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 11L1 6L6 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ButtonBase>
        </li>
        {pages.map((page: number | string, index: number) => (
          <li
            aria-hidden="true"
            /* eslint-disable-next-line react/no-array-index-key */
            key={`${page}-${index}`}
            className={clsx(styles.item, {
              [styles.first]: page === 1,
              [styles.last]: page === pages.slice(-1)[0],
              [`${styles[activeCls]}`]: page === currentPage,
            })}
          >
            <ButtonBase
              classes={{ root: styles.button }}
              onClick={typeof page === 'string' ? undefined : (): void => goToPage(page)}
              disabled={page === currentPage}
              data-test-id={`pagination-btn-${page}`}
            >
              {typeof page === 'string' ? '...' : page}
            </ButtonBase>
          </li>
        ))}
        <li
          className={clsx(styles.item, styles.next, {
            disable: currentPage === pageCount,
          })}
        >
          <ButtonBase
            disabled={pageCount === 1 || currentPage === pageCount}
            classes={{ root: clsx(styles.button, styles.arrowButton) }}
            onClick={goToNextPage}
            data-test-id="pagination-next"
          >
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                opacity="0.6"
                d="M0.999999 1L6 6L1 11"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </ButtonBase>
        </li>
      </ul>
    </div>
  );
};
