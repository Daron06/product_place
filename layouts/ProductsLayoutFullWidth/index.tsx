import { Breadcrumbs, BreadcrumbsItems } from 'components/Breadcrumbs';
import { PageTitle } from 'components/PageTitle';
import React from 'react';

import styles from './ProductsLayoutFullWidth.module.scss';

interface ProductsLayoutFullWidthProps {
  breadcrumbs?: BreadcrumbsItems[];
  pageTitle: string;
}

export const ProductsLayoutFullWidth: React.FC<ProductsLayoutFullWidthProps> = ({
  breadcrumbs,
  children,
  pageTitle,
}): React.ReactElement => {
  return (
    <div className={styles.page}>
      {breadcrumbs && (
        <div className="mb-20">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      )}

      <div className={styles.title}>
        <PageTitle>{pageTitle}</PageTitle>
      </div>
      {children}
    </div>
  );
};
