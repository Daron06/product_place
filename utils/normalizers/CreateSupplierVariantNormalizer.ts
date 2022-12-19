import { SupplierCreateVariantFormData } from 'components/pages/admin/SupplierVariationCreate';
import { CreateSupplierVartiantData, DashboardRole } from 'services/types';

export const createSupplierVariantNormalizer = (
  data: SupplierCreateVariantFormData,
  role: DashboardRole.STAFF | DashboardRole.SUPPLIER,
): CreateSupplierVartiantData => {
  return {
    category: {
      name: data.name || '',
      type: data.type || '',
      description: data.description,
    },
    options: data.options,
    ...(role === 'staff' ? { supplier: data.supplier } : {}),
  };
};
