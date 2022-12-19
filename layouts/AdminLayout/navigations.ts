import { IconName } from 'components/Icon';
import styles from 'layouts/AdminLayout/AdminLayout.module.scss';

export type NavigationItem = {
  activeCondition: string;
  href: string;
  text: string;
};

export type AdminNavigation = {
  className?: string;
  icon: IconName;
} & NavigationItem;

export const staffNavigation: AdminNavigation[] = [
  {
    className: styles.menuIcon,
    href: '/admin/staff',
    icon: 'admin-home',
    text: 'Home',
    activeCondition:
      '^(/admin/staff((/orders|/cloud-kitchens|/suppliers|/customers|/chefs|/cuisine|/required|/categories).*?)|/admin/staff)$',
  },
  {
    className: styles.menuIcon,
    href: '/admin/staff/menu',
    icon: 'admin-menu',
    text: 'Menu',
    activeCondition: '^/admin/staff/menu.*?$',
  },
  {
    className: styles.menuIcon,
    href: '/admin/staff/recipes',
    icon: 'admin-meal-kits',
    text: 'Recipes',
    activeCondition: '^/admin/staff/recipes.*?$',
  },
  {
    className: styles.adminChefsIcon,
    href: '/admin/staff/master-classes',
    icon: 'admin-master-class',
    text: 'Masterclasses',
    activeCondition: '^/admin/staff/master-classes(?:(/edit.*?))?$',
  },
  {
    className: styles.adminChefsIcon,
    href: '/admin/staff/chef-table',
    icon: 'admin-chefs',
    text: 'Chef’s Table',
    activeCondition: '^/admin/staff/chef-table.*?$',
  },
  {
    className: styles.adminChefsIcon,
    href: '/admin/staff/store',
    icon: 'admin-store',
    text: 'Store',
    activeCondition: '^/admin/staff/store.*?$',
  },
  {
    className: styles.adminChefsIcon,
    href: '/admin/staff/warehouse',
    icon: 'admin-warehouse',
    text: 'Warehouse',
    activeCondition: '^/admin/staff/warehouse.*?$',
  },
  {
    className: styles.adminChefsIcon,
    href: '/admin/staff/blog',
    icon: 'blog-icon',
    text: 'Blog posts',
    activeCondition: '^/admin/staff/blogs.*?$',
  },
];

export const supplierNavigation: AdminNavigation[] = [
  {
    className: styles.menuIcon,
    href: '/admin/supplier',
    icon: 'admin-home',
    text: 'Home',
    activeCondition: '^/admin/supplier$',
  },
  {
    className: styles.adminChefsIcon,
    href: '/admin/supplier/recipes',
    icon: 'admin-meal-kits',
    text: 'Recipes',
    activeCondition: '^/admin/supplier/recipes.*?$',
  },
  {
    href: '/admin/supplier/warehouse',
    icon: 'admin-warehouse',
    text: 'Warehouse',
    activeCondition: '^/admin/supplier/warehouse.*?$',
  },
  {
    className: styles.adminChefsIcon,
    href: '/admin/supplier/chefs',
    icon: 'admin-nav-chefs',
    text: 'Chefs',
    activeCondition: '^/admin/supplier/chefs.*?$',
  },
];

export const chefNavigation: AdminNavigation[] = [
  {
    className: styles.menuIcon,
    href: '/admin/chef',
    icon: 'admin-home',
    text: 'Home',
    activeCondition: '^/admin/chef$',
  },
  {
    className: styles.menuIcon,
    href: '/admin/chef/menu',
    icon: 'admin-menu',
    text: 'Menu',
    activeCondition: '^/admin/supplier/menu.*?$',
  },
  {
    className: styles.adminChefsIcon,
    href: '/admin/chef/recipes',
    icon: 'admin-meal-kits',
    text: 'Recipes',
    activeCondition: '^/admin/supplier/recipes.*?$',
  },
  {
    className: styles.adminChefsIcon,
    href: '/admin/chef/master-classes',
    icon: 'admin-master-class',
    text: 'Masterclasses',
    activeCondition: '^/admin/supplier/master-classes.*?$',
  },
  {
    className: styles.adminChefsIcon,
    href: '/admin/chef/store',
    icon: 'admin-store',
    text: 'Store',
    activeCondition: '^/admin/supplier/store.*?$',
  },
  {
    className: styles.adminChefsIcon,
    href: '/admin/chef/chef-table',
    icon: 'admin-chefs',
    text: 'Chef’s Table',
    activeCondition: '^/admin/supplier/chef-table.*?$',
  },
];

export const kitchenNavigation: AdminNavigation[] = [
  {
    className: styles.menuIcon,
    href: '/admin/cloud-kitchen',
    icon: 'admin-home',
    text: 'Home',
    activeCondition: '^/admin/cloud-kitchen$',
  },
  {
    className: styles.menuIcon,
    href: '/admin/cloud-kitchen/menu',
    icon: 'admin-menu',
    text: 'Menu',
    activeCondition: '^/admin/cloud-kitchen/menu.*?$',
  },
  {
    className: styles.adminChefsIcon,
    href: '/admin/cloud-kitchen/chefs',
    icon: 'admin-nav-chefs',
    text: 'Chefs',
    activeCondition: '^/admin/cloud-kitchen/chefs.*?$',
  },
];
