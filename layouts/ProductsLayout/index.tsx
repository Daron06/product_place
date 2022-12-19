import { Breadcrumbs, BreadcrumbsItems } from 'components/Breadcrumbs';
import { Container } from 'components/Container';
import { PageTitle } from 'components/PageTitle';
import omit from 'lodash/omit';
import React from 'react';

import { LayoutStyles } from '../../components/Products';
import layoutStyles from './Products.module.scss';

interface ProductsLayoutProps {
  breadcrumbs: BreadcrumbsItems[];
  pageTitle: string;
  styles?: LayoutStyles;
}

export const ProductsLayout: React.FC<ProductsLayoutProps> = ({ breadcrumbs, children, pageTitle, styles }) => {
  const ContainerComponent = styles?.container ? Container : React.Fragment;

  const cssStyles = omit(styles, 'container');

  return (
    <ContainerComponent>
      <div className={layoutStyles.page} style={cssStyles}>
        <div className="mb-20">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        <div className={layoutStyles.title}>
          <PageTitle>{pageTitle}</PageTitle>
        </div>
        {children}
      </div>
    </ContainerComponent>
  );
};
