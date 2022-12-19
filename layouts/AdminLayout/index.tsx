import InputBase from '@material-ui/core/InputBase';
import MuiMenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList/MenuList';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { Icon } from 'components/Icon';
import { NotificationDropdown } from 'components/NotificationDropdown';
import { ProfileDropdown } from 'components/ProfileDropdown';
import {
  AdminNavigation,
  chefNavigation,
  kitchenNavigation,
  staffNavigation,
  supplierNavigation,
} from 'layouts/AdminLayout/navigations';
import flatten from 'lodash/flatten';
import isEmpty from 'lodash/isEmpty';
import values from 'lodash/values';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData } from 'redux/ducks/user/selectors';

import { setDirectories } from '../../redux/ducks/directories/actionsCreators';
import { selectDirectoriesData } from '../../redux/ducks/directories/selectors';
import { AdminProductsApi } from '../../services/api/admin/ProductsApi';
import { DirectoriesResponse, LangSelectType } from '../../services/types';
import styles from './AdminLayout.module.scss';

type InnerNavigation = {
  href: string;
  text: string;
  activeCondition?: string;
};

export enum NavigationKind {
  CHEF = 'chef',
  CLOUD_KITCHEN = 'cloud-kitchen',
  STAFF = 'staff',
  SUPPLIER = 'supplier',
}

interface AdminLayoutProps {
  title?: string;
  innerNavigation?: InnerNavigation[];
  navigation?: NavigationKind;
}

const getNavigation = (nav: NavigationKind): AdminNavigation[] => {
  const navs = {
    chef: chefNavigation,
    staff: staffNavigation,
    supplier: supplierNavigation,
    'cloud-kitchen': kitchenNavigation,
  };

  if (!(nav in navs)) {
    throw new Error(
      `The following navigation kind was expected ${NavigationKind.CHEF}, ${NavigationKind.SUPPLIER}, or ${NavigationKind.STAFF},  but got ${nav}`,
    );
  }

  return navs[nav];
};

export type LanguageContextProps = {
  setLanguage: (langType: LangSelectType) => void;
  acceptLanguage: LangSelectType;
};
export const LanguageContext = React.createContext({} as LanguageContextProps);

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  innerNavigation,
  title,
  navigation = NavigationKind.CHEF,
}): React.ReactElement => {
  const { asPath } = useRouter();
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const directories = useSelector(selectDirectoriesData);
  const fullName = userData?.chef?.name || userData?.supplier?.name || '';
  const avatarUrl = userData?.chef?.image || userData?.supplier?.image || userData?.image || '';
  const [acceptLanguage, setAcceptLanguage] = React.useState<LangSelectType>('en');

  React.useEffect(() => {
    async function fetchDirectories(): Promise<void> {
      try {
        const { data } = await AdminProductsApi.directories([
          'suppliers',
          'cloudKitchens',
          'cuisines',
          'allergens',
          'required',
          'chefs',
        ]);
        const createRecipeProps: DirectoriesResponse = {
          suppliers: data.suppliers,
          cuisines: data.cuisines,
          allergens: data.allergens,
          required: data.required,
          cloudKitchens: data.cloudKitchens,
          chefs: data.chefs,
        };

        dispatch(setDirectories(createRecipeProps));
      } catch (err) {
        console.warn('Error fetchDirectories', err);
      }
    }

    // TODO: Поправить типизацию
    if (isEmpty(flatten(values(directories) as Array<DirectoriesResponse>))) {
      fetchDirectories();
    }
  }, [directories, dispatch]);

  const nav = getNavigation(navigation);

  const pageTitle = {
    chef: 'Chef',
    supplier: 'Supplier',
    staff: 'Staff',
    'cloud-kitchen': 'Cloud Kitchen',
  };

  const setLanguage = (langType: LangSelectType): void => {
    if (typeof window !== 'undefined') {
      setAcceptLanguage(langType);
      window.localStorage.setItem('Accept-Language', langType);
    }
  };

  return (
    <LanguageContext.Provider value={{ acceptLanguage, setLanguage }}>
      <>
        <Head>
          <title>unknown {pageTitle[navigation]} Admin</title>
          <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" href="/favicon-192x192.png" sizes="192x192" />
          <link rel="apple-touch-icon" href="/favicon-180x180.png" />
          <meta name="msapplication-TileImage" content="/favicon-270x270.png" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <meta charSet="utf-8" />
        </Head>
        <div className={styles.root}>
          <header className={styles.header}>
            <div className={styles.headerLogo}>
              <Link href="/">
                <a className={styles.logo} href="/">
                  <img src="/logo.svg" alt="unknown admin" />
                </a>
              </Link>
            </div>
            <div className={styles.headerMain}>
              <InputBase
                classes={{
                  root: styles.headerSearch,
                }}
                placeholder="Search"
                startAdornment={
                  <div className={styles.headerSearchIcon}>
                    <Icon type="search-bold" />
                  </div>
                }
              />
              <div className="ml-auto">
                <div className="d-flex align-items-center">
                  {userData && (
                    <>
                      {userData.supplier && (
                        <div className="d-flex mr-30">
                          <Typography className="text-color-600" variant="body2">
                            {userData.supplier.type === 'supplier' ? 'Supplier' : 'Cloud Kitchen'}: &nbsp;
                          </Typography>
                          <Typography className="fw-bold" variant="body2">
                            {userData.supplier.name}
                          </Typography>
                        </div>
                      )}
                      <div className="mr-30">
                        <NotificationDropdown />
                      </div>
                      <ProfileDropdown fullName={fullName} avatarUrl={avatarUrl} role={navigation} />
                    </>
                  )}
                </div>
              </div>
            </div>
          </header>
        </div>
        <main className="d-flex">
          <nav className={styles.mainNavigation}>
            <ul className={styles.menuList}>
              {nav.map((item) => (
                <MuiMenuItem
                  button
                  className={clsx(
                    styles.mainNavigationItem,
                    {
                      [styles.active]: new RegExp(item.activeCondition || item.href).test(asPath),
                    },
                    item.className,
                  )}
                  key={item.href}
                >
                  <Link href={item.href}>
                    <a
                      href={item.href}
                      className={`${styles.mainNavigationLink} d-flex flex-column align-items-center justify-content-center flex-auto`}
                    >
                      <div className={`${styles.mainNavigationItemIcon} ${item.className}`}>
                        <Icon type={item.icon} className={item.icon} />
                      </div>
                      <Typography className={styles.mainNavigationItemLink}>{item.text}</Typography>
                    </a>
                  </Link>
                </MuiMenuItem>
              ))}
            </ul>
          </nav>
          <div className={styles.innerContent}>
            {innerNavigation && (
              <nav className={styles.innerNavigation}>
                <div className={styles.innerNavigationHead}>
                  <Typography className={styles.innerContentTitle} variant="h6">
                    {title}
                  </Typography>
                </div>
                <MenuList classes={{ root: styles.innerMenuList }}>
                  {innerNavigation.map((item) => (
                    <Link href={item.href} key={item.href}>
                      <MuiMenuItem
                        key={item.href}
                        className={clsx(styles.innerNavigationItem, {
                          [styles.innerNavigationItemActive]: new RegExp(item.activeCondition || `^${item.href}$`).test(
                            asPath,
                          ),
                        })}
                      >
                        <Typography className={styles.innerNavigationText}>{item.text}</Typography>
                      </MuiMenuItem>
                    </Link>
                  ))}
                </MenuList>
              </nav>
            )}
            <section className={styles.section}>{children}</section>
          </div>
        </main>
      </>
    </LanguageContext.Provider>
  );
};
