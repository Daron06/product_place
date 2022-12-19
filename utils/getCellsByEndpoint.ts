import { DashboardRole } from 'services/types';

import { HeadCell } from '../components/EnhancedTableHead';
import { AdminEndpoints } from '../services/api/endpoints';

export const getCellsByEndpoint = (endpoint: AdminEndpoints | DashboardRole): HeadCell[] | undefined => {
  switch (endpoint) {
    case AdminEndpoints.MENU:
    case AdminEndpoints.RECIPES:
      return [
        { id: 'name', label: 'Product' },
        { id: 'price', label: 'Price' },
        { id: 'supplier', label: 'Supplier' },
        { id: 'status', label: 'Status' },
      ];
    case AdminEndpoints.CHEFS_TABLE:
      return [
        { id: 'name', label: 'Product' },
        { id: 'price', label: 'Price' },
        { id: 'chef', label: 'Chef' },
        { id: 'status', label: 'Status' },
      ];
    case AdminEndpoints.CHEF_STORE:
      return [
        { id: 'name', label: 'Product' },
        { id: 'supplier', label: 'Supplier' },
        { id: 'category', label: 'Category' },
        { id: 'price', label: 'Price' },
        { id: 'status', label: 'Status' },
      ];
    case AdminEndpoints.SUPPLIER_CHEFS:
      return [
        { id: 'id', label: 'id' },
        { id: 'chef', label: 'Chef' },
        { id: 'items', label: 'Items' },
        { id: 'status', label: 'Status' },
      ];
    case AdminEndpoints.SUPPLIER_PRODUCTS:
      return [
        { id: 'name', label: 'Product' },
        { id: 'price', label: 'Price' },
        { id: 'chef', label: 'Chef' },
        { id: 'status', label: 'Status' },
      ];
    case AdminEndpoints.INGREDIENTS:
      return [
        { id: 'id', label: 'id' },
        { id: 'name', label: 'Name / Code' },
        { id: 'menu', label: 'Menu' },
        { id: 'mealKits', label: 'Meal kits' },
        { id: 'total', label: 'Total use' },
        { id: 'status', label: 'Status' },
      ];
    case AdminEndpoints.SUPPLIER_STATISTICS:
      return [
        { id: 'id', label: 'Order' },
        { id: 'type', label: 'Type' },
        { id: 'chef', label: 'Chef' },
        { id: 'date', label: 'Date' },
        { id: 'summary', label: 'Amount' },
        { id: 'status', label: 'Status' },
      ];
    case AdminEndpoints.CHEF_STATISTICS:
      return [
        { id: 'order', label: 'Order' },
        { id: 'type', label: 'Type' },
        { id: 'supplier', label: 'Supplier' },
        { id: 'date', label: 'Date' },
        { id: 'amount', label: 'Amount' },
        { id: 'status', label: 'Status' },
      ];
    case AdminEndpoints.KITCHEN_STATISTICS:
      return [
        { id: 'order', label: 'Order' },
        { id: 'chef', label: 'Chef' },
        { id: 'unique', label: 'Unique number' },
        { id: 'date', label: 'Date' },
        { id: 'amount', label: 'Amount' },
        { id: 'status', label: 'Status' },
      ];
    case AdminEndpoints.ORDERS:
      return [
        { id: 'product', label: 'Product' },
        { id: 'yourPrice', label: 'Your Commission' },
        { id: 'price', label: 'Price' },
        { id: 'quantity', label: 'Quantity' },
        { id: 'subtotal', label: 'Subtotal' },
      ];
    case AdminEndpoints.STAFF_PRODUCTS:
      return [
        { id: 'product', label: 'Product' },
        { id: 'chef', label: 'Chef' },
        { id: 'price', label: 'Price' },
        { id: 'sales', label: 'Sales' },
        { id: 'status', label: 'Status' },
      ];
    case AdminEndpoints.STAFF_ORDERS:
      return [
        { id: 'invoice', label: 'Invoice' },
        { id: 'type', label: 'Type' },
        { id: 'supplier', label: 'Supplier' },
        { id: 'chef', label: 'Chef' },
        { id: 'date', label: 'Date' },
        { id: 'amount', label: 'Amount' },
        { id: 'status', label: 'Status' },
      ];
    case AdminEndpoints.CUISINES:
      return [
        { id: 'name', label: 'Name' },
        { id: 'menu', label: 'Menu' },
        { id: 'mealKits', label: 'Meal kits' },
        { id: 'total', label: 'Total use' },
        { id: 'status', label: 'Status' },
      ];
    case AdminEndpoints.COUPONS:
      return [
        { id: 'code', label: 'Code' },
        { id: 'type', label: 'Coupon type' },
        { id: 'amount', label: 'Coupon amount' },
        { id: 'limit', label: 'Usage / Limit' },
        { id: 'date', label: 'Expiry date' },
        { id: 'status', label: 'Status' },
      ];
    case DashboardRole.STAFF:
      return [
        { id: 'id', label: 'id' },
        { id: 'name', label: 'Name' },
        { id: 'supplier', label: 'Supplier/Cloud kitchen' },
        { id: 'menu', label: 'Menu' },
        { id: 'mealKits', label: 'Meal kits' },
        { id: 'total', label: 'Total use' },
        { id: 'status', label: 'Status' },
      ];
    case DashboardRole.CHEF:
      return [
        { id: 'id', label: 'id' },
        { id: 'name', label: 'Name' },
        { id: 'supplier', label: 'Supplier/Cloud kitchen' },
        { id: 'menu', label: 'Menu' },
        { id: 'mealKits', label: 'Meal kits' },
        { id: 'total', label: 'Total use' },
        { id: 'status', label: 'Status' },
      ];
    case DashboardRole.SUPPLIER:
      return [
        { id: 'id', label: 'id' },
        { id: 'name', label: 'Name' },
        { id: 'supplier', label: 'Supplier/Cloud kitchen' },
        { id: 'menu', label: 'Menu' },
        { id: 'mealKits', label: 'Meal kits' },
        { id: 'total', label: 'Total use' },
        { id: 'status', label: 'Status' },
      ];
    default:
      return undefined;
  }
};
