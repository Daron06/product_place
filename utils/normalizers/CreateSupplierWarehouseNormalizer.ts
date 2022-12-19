import isNaN from 'lodash/isNaN';
import omit from 'lodash/omit';
import { Product } from 'redux/ducks/products/types/contracts';

import { CategoryItem, DashboardRole, OptionVariants, Supplier } from '../../services/types';

export interface SupplierWarehouseCreateFormData {
  additionalInfo?: Partial<Product['additionalInfo']>;
  name: string;
  description: string;
  shortDescription: string | null;
  media: [
    {
      name: string;
      url: string;
    },
  ];
  msrpPrice?: number;
  chefPrice?: number;
  status: string;
  price?: number;
  supplier?: Pick<Supplier, 'id' | 'name' | 'slug'> | null;
  category: CategoryItem;
  supplierPrice?: number | string;
  inventory?: number | string;
  options: Array<{ supplierPrice: number | string; msrpPrice?: number | string; chefPrice?: number | string }>;
}

export type SupplierWarehouseCreateFields = Omit<SupplierWarehouseCreateFormData, 'category' | 'options'> & {
  category: string;
  options: OptionVariants[];
};

export const createSupplierWarehouseNormalizer = (
  data: SupplierWarehouseCreateFields,
  categories: CategoryItem[],
  role: DashboardRole.STAFF | DashboardRole.SUPPLIER,
): SupplierWarehouseCreateFormData | null => {
  const category = categories.find((obj) => obj.slug === data.category);

  if (!category) {
    return null;
  }

  return omit<SupplierWarehouseCreateFormData>({
    name: data.name,
    description: data.description,
    shortDescription: data.shortDescription,
    status: data.status,
    media: data.media,
    category,
    supplier: data.supplier
      ? {
          id: data.supplier?.id ?? '',
          name: data.supplier?.name ?? '',
          slug: data.supplier?.slug ?? '',
        }
      : undefined,
    price: isNaN(Number(data.price)) ? undefined : Number(data.price),
    msrpPrice: isNaN(Number(data.msrpPrice)) ? undefined : Number(data.msrpPrice),
    chefPrice: isNaN(Number(data.chefPrice)) ? undefined : Number(data.chefPrice),
    supplierPrice: isNaN(Number(data.supplierPrice)) ? undefined : Number(data.supplierPrice),
    inventory: isNaN(Number(data.inventory)) ? undefined : Number(data.inventory),
    options: data.options?.map((obj) => ({
      inventory: obj?.inventory || 0,
      sku: obj?.sku || 0,
      option: {
        id: obj.option?.id || obj.id,
      },
      ...(role === 'staff'
        ? {
            msrpPrice: obj?.msrpPrice || 0,
            price: Number(obj.price) || 0,
            chefPrice: obj?.chefPrice || 0,
            supplierPrice: Number(obj.supplierPrice) || 0,
          }
        : {
            msrpPrice: obj?.msrpPrice || 0,
            supplierPrice: Number(obj.supplierPrice) || 0,
          }),
    })),
    additionalInfo: {
      preparationTime: data?.additionalInfo?.preparationTime,
      productFlags: data?.additionalInfo?.productFlags,
    },
  }) as SupplierWarehouseCreateFormData;
};
