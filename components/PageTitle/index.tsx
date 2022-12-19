import { Typography } from '@material-ui/core';
import React from 'react';

import styles from './PageTitle.module.scss';

export const PageTitle: React.FC = ({ children }): React.ReactElement => {
  return (
    <Typography className={styles.pageTitle} component="h4" variant="inherit">
      {children}
    </Typography>
  );
};
