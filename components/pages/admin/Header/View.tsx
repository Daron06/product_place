import Button from '@material-ui/core/Button';
import { Immutable } from 'immer';
import Link from 'next/link';
import React from 'react';

import { User } from '../../../../redux/ducks/user/types/state';
import styles from './Header.module.scss';

export interface AdminHeaderProps {
  userData: Immutable<User> | null;
  currentPath?: string;
}

export const HeaderView: React.FC<AdminHeaderProps> = ({ userData, currentPath }): React.ReactElement | null => {
  const isLoginPage = currentPath === '/admin';

  const SignButton = (): React.ReactElement | null => {
    if (userData) {
      return null;
    }

    return isLoginPage ? (
      <Link href="/admin/register/choose-role">
        <Button variant="contained" color="secondary" className={styles.button}>
          Sign Up
        </Button>
      </Link>
    ) : (
      <Link href="/admin">
        <Button variant="contained" color="secondary" className={styles.button}>
          Login
        </Button>
      </Link>
    );
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerWrapper}>
        <Link href="/">
          <a className={styles.headerLogo} href="/">
            <img src="/logo.svg" alt="Logo" />
          </a>
        </Link>
        <SignButton />
      </div>
    </div>
  );
};
