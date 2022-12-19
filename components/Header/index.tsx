import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { NotificationDropdown } from 'components/NotificationDropdown';
import { ProfileDropdown } from 'components/ProfileDropdown';
import { VerifiedModal } from 'components/VerifiedModal';
import { pick } from 'lodash';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { AuthApi } from 'services/api/AuthApi';
import { DashboardRole } from 'services/types';

import { useTranslate } from '../../hooks/useTranslate';
import { AppContext } from '../../pages/_app';
import { selectUserData } from '../../redux/ducks/user/selectors';
import { AuthModalProps } from '../AuthModal';
import styles from './Header.module.scss';

const CartButton = dynamic<{ text?: string }>(
  () => import(/* webpackChunkName: "CartButton" */ '../CartButton').then((m) => m.CartButton),
  {
    ssr: false,
    // eslint-disable-next-line react/display-name
    loading: () => (
      <div className={styles.cartButtonPlaceholder}>
        <svg width="24" height="24" fill="none" viewBox="0 0 31 24">
          <path
            d="M1 5.762v14.286l14.5 5.953M1 5.761l14.5 4.762M1 5.762L15.5 1 30 5.762M15.5 26L30 20.048V5.762M15.5 26V10.524M30 5.762l-14.5 4.762M5.883 7.366v6.398l2.035-.263 2.441 2.004V8.836"
            stroke="#373737"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
  },
);

interface HeaderProps {
  className?: string;
  pageTitle?: string;
  onMenuClick: () => void;
}

export const DynamicAuthModal = dynamic<AuthModalProps>(
  () => import(/* webpackChunkName: "AuthModal" */ 'components/AuthModal').then((mod) => mod.AuthModal),
  {
    ssr: false,
  },
);

export const Header: FC<HeaderProps> = React.memo(function Header({ className, onMenuClick }) {
  const { authOpenForm, setAuthOpenForm } = React.useContext(AppContext);
  const { changeLanguage, currentLanguage, t } = useTranslate('header');
  const [verifiedOpenModal, setVerifiedOpenModal] = React.useState<boolean>(false);
  const [isVerified, setIsVerified] = React.useState<boolean>(false);
  const [modalInfoText, setModalInfoText] = React.useState<string>('');
  const userData = useSelector(selectUserData, (prev, cur) =>
    shallowEqual(pick(prev, ['firstName', 'lastName', 'image']), pick(cur, ['firstName', 'lastName', 'image'])),
  );

  const closeAuthModal = (): void => {
    setAuthOpenForm(undefined);
  };

  const closeVerifiedModal = (): void => {
    setVerifiedOpenModal(false);
  };

  const router = useRouter();

  React.useEffect(() => {
    const verifyAccount = async (): Promise<void> => {
      if (router.query['verification-token']) {
        try {
          await AuthApi.verify(router.query['verification-token'] as string);
          setIsVerified(true);
          setModalInfoText('Your account has been successfully verified. You can log into your account.');
          setAuthOpenForm('login');
        } catch (err: any) {
          console.warn('Verify error', err);
          setVerifiedOpenModal(true);
          setIsVerified(false);
        }
      }
    };

    verifyAccount();
  }, [router.query['verification-token']]);

  return (
    <header className={clsx(styles.header, className)}>
      <div className={styles.headerContainer}>
        <div className={styles.headerWrapper}>
          <div className={styles.headerMenu}>
            <div className={styles.menuButtonWideScreens}>
              <button aria-label="Left Top Hamburger" type="button" className={styles.menuButton} onClick={onMenuClick}>
                <svg viewBox="0 0 26 11" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1H16.5M1 10H24.5" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <Link href="/">
              <a className={styles.logo} href="/">
                <Image width={110} height={31} src="/logo.svg" alt="Logo" />
              </a>
            </Link>

            <div className={styles.langButtonWrapper}>
              <Button
                className={styles.changeLangButton}
                onClick={() => changeLanguage(currentLanguage === 'ar' ? 'en' : 'ar')}
              >
                {currentLanguage === 'ar' ? 'English' : 'عربي'}
              </Button>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div className={styles.cartButton}>
              <CartButton />
            </div>
            {userData ? (
              <div className={styles.headerUserProfile}>
                <div className={styles.userNotification}>
                  <NotificationDropdown />
                </div>
                <div className={styles.userAvatar}>
                  <ProfileDropdown
                    fullName={`${userData.firstName} ${userData.lastName}`}
                    avatarUrl={userData.image}
                    role={DashboardRole.WEB}
                  />
                </div>
                <div className={styles.menuButtonSmallScreens}>
                  <button type="button" className={styles.menuButton} onClick={onMenuClick}>
                    <svg viewBox="0 0 26 11" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1H16.5M1 10H24.5" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <>
                {authOpenForm && (
                  <DynamicAuthModal
                    initForm={authOpenForm}
                    open={!!authOpenForm}
                    infoText={modalInfoText}
                    onClose={closeAuthModal}
                  />
                )}
                {verifiedOpenModal && (
                  <VerifiedModal open={verifiedOpenModal} onClose={closeVerifiedModal} isVerified={isVerified} />
                )}
                <Button
                  data-test-id="login-button"
                  className={clsx(styles.loginButton, styles.headerButton)}
                  onClick={(): void => setAuthOpenForm('login')}
                >
                  {t('login')}
                </Button>
                <Button
                  data-test-id="register-button"
                  className={clsx(styles.headerButton, styles.regButton, 'signup-button')}
                  classes={{ root: styles.signUpButton, label: styles.signUpButtonLabel }}
                  size="large"
                  variant="contained"
                  onClick={(): void => setAuthOpenForm('register')}
                >
                  {t('sign-up')}
                </Button>
                <div className={styles.menuButtonSmallScreens}>
                  <button type="button" className={styles.menuButton} onClick={onMenuClick}>
                    <svg viewBox="0 0 26 11" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1H16.5M1 10H24.5" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
});
