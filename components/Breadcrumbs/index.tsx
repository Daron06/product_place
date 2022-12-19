import MuiBreadcrumbs, { BreadcrumbsProps as MuiBreadcrumbsProps } from '@material-ui/core/Breadcrumbs';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

import styles from './Breadcrumbs.module.scss';

export type BreadcrumbsItems = {
  title: string;
  url?: string;
};
interface BreadcrumbsProps extends MuiBreadcrumbsProps {
  items: BreadcrumbsItems[];
  cssClass?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, cssClass }): React.ReactElement => {
  return (
    <MuiBreadcrumbs className={clsx(!!cssClass && styles[cssClass], styles.block)}>
      {items.map((breadcrumb) =>
        breadcrumb.url ? (
          <Link key={breadcrumb.title} href={breadcrumb.url}>
            <MuiLink href={breadcrumb.url}>{breadcrumb.title}</MuiLink>
          </Link>
        ) : (
          <Typography key={breadcrumb.title} className={styles.lastItem} variant="subtitle2">
            {breadcrumb.title}
          </Typography>
        ),
      )}
    </MuiBreadcrumbs>
  );
};
