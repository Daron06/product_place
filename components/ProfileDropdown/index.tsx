import { Avatar, Divider, ListItemIcon } from '@material-ui/core';
import MuiMenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { Dropdown } from 'components/Dropdown';
import { Icon } from 'components/Icon';
import { useTranslate } from 'hooks/useTranslate';
import { NavigationKind } from 'layouts/AdminLayout';
import styles from 'layouts/AdminLayout/AdminLayout.module.scss';
import Link from 'next/link';
import { AppContext } from 'pages/_app';
import React from 'react';
import { DashboardRole } from 'services/types';

import { Button } from '../Button';

interface ProfileDropdownInterface {
  fullName: string;
  avatarUrl: string | null;
  role?: DashboardRole | NavigationKind;
}

const adminLinks = [
  { url: 'profile', text: 'Profile Settings', user: [] },
  { url: 'profile/address', text: 'Address details', user: ['chef'] },
  { url: 'profile/experience', text: 'Work experience', user: ['supplier', 'cloud-kitchen'] },
  { url: 'profile/contact', text: 'Contact details', user: [] },
  { url: 'profile/accounting', text: 'Accounting', user: [] },
  { url: 'profile/password', text: 'Password', user: [] },
];

const MenuLink = (link, role): React.ReactElement | null => {
  if (role === DashboardRole.STAFF) {
    return null;
  }
  if (role === DashboardRole.WEB) {
    return (
      <Link key={link.url} href={`/${link.url}`}>
        <a href={`/${link.url}`}>
          <MuiMenuItem className={styles.dropdownMenuItem}>
            <Typography variant="inherit">{link.text}</Typography>
          </MuiMenuItem>
        </a>
      </Link>
    );
  }
  if (!link.user.includes(role)) {
    return (
      <Link key={link.url} href={`/admin/${role}/${link.url}`}>
        <a href={`/admin/${role}/${link.url}`}>
          <MuiMenuItem className={styles.dropdownMenuItem}>
            <Typography variant="inherit">{link.text}</Typography>
          </MuiMenuItem>
        </a>
      </Link>
    );
  }
  return null;
};

const defaultAvatarPath = '/static/no_avatar.svg';

export const ProfileDropdown: React.FC<ProfileDropdownInterface> = ({
  fullName,
  avatarUrl,
  role,
}): React.ReactElement => {
  const { setOpenLogoutModal } = React.useContext(AppContext);

  const avatarAlt = `Avatar ${fullName}`;
  const { t, currentLanguage } = useTranslate('header');

  const profileLinks = (role === DashboardRole.WEB ? t('profile-popup') : adminLinks)
    .map((link) => MenuLink(link, role))
    .filter(Boolean);

  const handleLogout = (): void => {
    setOpenLogoutModal(true);
  };

  if (role === DashboardRole.STAFF) {
    return (
      <Button onClick={handleLogout} color="secondary" variant="contained">
        Logout
      </Button>
    );
  }

  return (
    <Dropdown
      classes={{
        popper: styles.popper,
        paper: styles.paper,
      }}
      overlay={
        <div className={styles.avatar} data-test-id="user-dropdown">
          <Avatar alt={avatarAlt} src={avatarUrl || defaultAvatarPath} />
        </div>
      }
    >
      <div className={`d-flex align-items-center ${currentLanguage === 'ar' ? 'pr' : 'pl'}-20 pb-20`}>
        <Avatar alt={avatarAlt} src={avatarUrl || defaultAvatarPath} sizes="35" />

        <div className={`d-flex flex-column ${currentLanguage === 'ar' ? 'mr' : 'ml'}-10`}>
          <Typography className={clsx(styles.profileName, styles.profileNameBold)} variant="subtitle1">
            {fullName}
          </Typography>
        </div>
      </div>

      {profileLinks.length > 0 && (
        <>
          <Divider />
          <div className="pt-10 pb-15">{profileLinks}</div>
          <Divider />
        </>
      )}

      <MuiMenuItem className={`${styles.dropdownMenuItem} d-flex align-items-center`} onClick={handleLogout}>
        <ListItemIcon className={styles.meuItemIcon}>
          <Icon type="logout" viewBox={{ height: 18, width: 10 }} height={16} width={16} />
        </ListItemIcon>
        <Typography variant="inherit" data-test-id="admin-logout">
          {t('logout')}
        </Typography>
      </MuiMenuItem>
    </Dropdown>
  );
};
