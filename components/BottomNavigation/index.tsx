import { ButtonBase } from '@material-ui/core';
import clsx from 'clsx';
import { FormType } from 'components/AuthModal/types';
import { CartButton } from 'components/CartButton';
import { DynamicAuthModal } from 'components/Header';
import { Icon } from 'components/Icon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from 'redux/ducks/user/selectors';

import { useTranslate } from '../../hooks/useTranslate';
import styles from './BottomNavigation.module.scss';

export interface BottomNavigationProps {
  onMenuClick: () => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ onMenuClick }) => {
  const [authOpenForm, setAuthOpenForm] = React.useState<FormType>();
  const router = useRouter();
  const user = useSelector(selectUserData);
  const { t } = useTranslate('main-navigation');

  const closeAuthModal = (): void => {
    setAuthOpenForm(undefined);
  };

  return (
    <div className={styles.nav}>
      <ul>
        <li>
          <Link href="/">
            <a href="/">
              <ButtonBase className={clsx(styles.navItem, { [styles.navItemActive]: router.pathname === '/' })}>
                <Icon type="navHome" />
                <span className={styles.text}>{t('bottom-nav-home')}</span>
              </ButtonBase>
            </a>
          </Link>
        </li>
        <li>
          <ButtonBase className={styles.navItem} onClick={onMenuClick}>
            <Icon type="navSearch" />
            <span className={styles.text}>{t('bottom-nav-explore')}</span>
          </ButtonBase>
        </li>
        <li>
          <ButtonBase className={clsx(styles.navItem, styles.navItemCartIcon)}>
            <CartButton text={t('bottom-nav-cart')} />
          </ButtonBase>
        </li>
        {!user ? (
          <>
            <li onClick={(): void => setAuthOpenForm('login')}>
              <ButtonBase
                className={clsx(styles.navItem, { [styles.navItemActive]: router.pathname === '/profile/favorites' })}
              >
                <Icon type="navFavorite" />
                <span className={styles.text}>{t('bottom-nav-favorites')}</span>
              </ButtonBase>
            </li>
            <li onClick={(): void => setAuthOpenForm('login')}>
              <ButtonBase className={clsx(styles.navItem, { [styles.navItemActive]: router.pathname === '/profile' })}>
                <Icon type="navUser" />
                <span className={styles.text}>{t('bottom-nav-profile')}</span>
              </ButtonBase>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/profile/favorites">
                <a href="/profile/favorites">
                  <ButtonBase
                    className={clsx(styles.navItem, {
                      [styles.navItemActive]: router.pathname === '/profile/favorites',
                    })}
                  >
                    <span className={styles.navItemFavoriteIcon}>
                      <Icon type="navFavorite" />
                    </span>
                    <span className={styles.text}>{t('bottom-nav-favorites')}</span>
                  </ButtonBase>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/profile">
                <a href="/profile">
                  <ButtonBase
                    className={clsx(styles.navItem, { [styles.navItemActive]: router.pathname === '/profile' })}
                  >
                    <Icon type="navUser" />
                    <span className={styles.text}>{t('bottom-nav-profile')}</span>
                  </ButtonBase>
                </a>
              </Link>
            </li>
          </>
        )}
      </ul>
      {authOpenForm && <DynamicAuthModal initForm={authOpenForm} open={!!authOpenForm} onClose={closeAuthModal} />}
    </div>
  );
};
