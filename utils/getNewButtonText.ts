import { AdminEndpoints } from '../services/api/endpoints';

type ReturnType = {
  buttonText: string;
  buttonPath: string;
  visibleButton: boolean;
};

export const getNewButtonText = (endpoint: string): ReturnType => {
  const text = {
    [AdminEndpoints.MENU]: 'New Dish',
    [AdminEndpoints.RECIPES]: 'New Kit',
    [AdminEndpoints.CHEFS_TABLE]: 'New Chef table',
    [AdminEndpoints.MASTER_CLASS]: 'New Master class',
    '/admin/chef/store': 'New Chef store',
    '/admin/staff/customers': 'New customer',
    [AdminEndpoints.SUPPLIER_CHEFS]: 'New Supplier chef',
    [AdminEndpoints.SUPPLIER_WEB_OPTIONS]: 'New variation',
    [AdminEndpoints.STAFF_ACCOUNTING]: 'Add payout',
  };

  const visibleButton = ![
    '/admin/supplier/recipes',
    '/admin/cloud-kitchen/menu',
    '/admin/staff/suppliers',
    '/admin/staff/cloud-kitchens',
    '/admin/staff/chefs',
    '/admin/supplier/chefs',
    '/admin/cloud-kitchen/chefs',
    '/admin/staff/orders',
  ].includes(endpoint);

  const getButtonPath = {
    '/admin/chef/store': '/admin/chef/store/warehouse',
    '/admin/staff/store': '/admin/staff/store/warehouse',
    [AdminEndpoints.STAFF_ACCOUNTING]: '#',
  };

  return {
    buttonText: endpoint in text ? text[endpoint] : 'New item',
    visibleButton,
    buttonPath: getButtonPath[endpoint],
  };
};
