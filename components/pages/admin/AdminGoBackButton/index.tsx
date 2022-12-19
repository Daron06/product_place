import { Button } from '@material-ui/core';
import { Icon } from 'components/Icon';
import { useRouter } from 'next/router';
import React from 'react';

import styles from './AdminGoBackButton.module.scss';

export const AdminGoBackButton: React.FC = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()} className={styles.backButton} variant="contained">
      <Icon type="arrow-left" />
    </Button>
  );
};
