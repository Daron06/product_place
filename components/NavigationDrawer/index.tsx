import { Divider, Drawer, MenuItem } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useTranslate } from 'hooks/useTranslate';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'redux/ducks/user/actionsCreators';
import { selectUserData } from 'redux/ducks/user/selectors';

import styles from './Navigation.module.scss';

export interface NavigationProps {
  menuOpened: boolean;
  onClose: () => void;
}

export const NavigationDrawer: React.FC<NavigationProps> = ({ menuOpened, onClose }) => {
  const user = useSelector(selectUserData);
  const { t, currentLanguage } = useTranslate('main-navigation');
  const dispatch = useDispatch();

  const handleLogout = (): void => {
    if (typeof window !== 'undefined' && window.confirm(t('logout-confirmation-text'))) {
      dispatch(signOut());
    }
  };

  return (
    <Drawer
      anchor={currentLanguage === 'ar' ? 'right' : 'left'}
      classes={{ paper: styles.paper }}
      open={menuOpened}
      onClose={onClose}
    >
      <button type="button" className={styles.closeButton} onClick={onClose}>
        <span className={styles.closeIcon} />
      </button>
      <nav className={styles.root}>
        <ul className={styles.mainList}>
          {t('unknown').map((item) => (
            <MenuItem key={item.title} className={styles.item}>
              <a href={item.link}>
                <Typography className={styles.mainItemBoldText} variant="body1">
                  {item.title}
                </Typography>
              </a>
            </MenuItem>
          ))}
        </ul>
        <ul>
          {t('about').map((item) => (
            <Link key={item.title} href={item.link}>
              <MenuItem className={styles.item}>
                <a href={item.link}>
                  <Typography variant="body1">{item.title}</Typography>
                </a>
              </MenuItem>
            </Link>
          ))}
        </ul>
        {user && (
          <div className={styles.logout}>
            <Divider />
            <ul>
              <MenuItem className={styles.item} onClick={handleLogout}>
                <span>
                  <Typography variant="body1">{t('logout-nav-text')}</Typography>
                </span>
              </MenuItem>
            </ul>
          </div>
        )}
      </nav>
    </Drawer>
  );
};
