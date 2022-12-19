import { AdminLayout, NavigationKind } from 'layouts/AdminLayout';
import React from 'react';

import styles from './AdminProfileLayout.module.scss';

interface AdminProfileLayoutProps {
  title: string;
  innerNavigation: { href: string; text: string }[];
  sidebarTitle: string;
  navigation?: NavigationKind;
}

export const AdminProfileLayout: React.FC<AdminProfileLayoutProps> = ({
  children,
  title,
  navigation,
  sidebarTitle,
  innerNavigation,
}): React.ReactElement => {
  return (
    <AdminLayout title={title} innerNavigation={innerNavigation} navigation={navigation}>
      <div className={styles.profile}>
        <h2 className={styles.title}>{sidebarTitle}</h2>
        {children}
      </div>
    </AdminLayout>
  );
};
