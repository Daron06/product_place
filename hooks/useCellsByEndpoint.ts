import { NextRouter, useRouter } from 'next/router';

import { HeadCell } from '../components/EnhancedTableHead';
import { AdminEndpoints } from '../services/api/endpoints';
import { getCellsByEndpoint } from '../utils/getCellsByEndpoint';

type ReturnType = {
  cells: HeadCell[] | undefined;
  endpoint: string;
  router: NextRouter;
};

export const useCellsByEndpoint = (): ReturnType => {
  const router = useRouter();
  const { pathname } = router;

  const obj = {
    '/admin/supplier/recipes': AdminEndpoints.SUPPLIER_PRODUCTS,
    '/admin/cloud-kitchen/menu': AdminEndpoints.SUPPLIER_PRODUCTS,
    '/admin/chef/recipes': AdminEndpoints.RECIPES,
    '/admin/staff/chef-table': AdminEndpoints.CHEFS_TABLE,
    '/admin/staff/recipes': AdminEndpoints.RECIPES,
    '/admin/chef/chef-table': AdminEndpoints.CHEFS_TABLE,
    '/admin/chef/store': AdminEndpoints.CHEF_STORE,
    '/admin/chef/menu': AdminEndpoints.MENU,
    '/admin/staff/menu': AdminEndpoints.STAFF_PRODUCTS,
    '/admin/staff/orders': AdminEndpoints.STAFF_ORDERS,
  };

  const endpoint = obj[pathname];

  return {
    cells: getCellsByEndpoint(endpoint),
    endpoint: pathname,
    router,
  };
};
