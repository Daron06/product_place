import { Button, Typography } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';

import SuccessSvg from '../../../../assets/icons/success-icon.svg';
import styles from './SuccessInfo.module.scss';

export const SuccessInfo = (): React.ReactElement => {
  return (
    <div className={styles.successInfoWrapper}>
      <div className={styles.successInfoIcon}>
        <SuccessSvg />
      </div>
      <Typography variant="h3">Request sent successfully</Typography>
      <Typography>
        It will take us some time to verify your details. After that, the manager will contact you to confirm the
        information. And then you will get access to your personal account.
      </Typography>
      <Link href="/">
        <Button variant="contained" color="secondary">
          Go to home page
        </Button>
      </Link>
    </div>
  );
};
