import { Chef } from 'redux/ducks/products/types/contracts';

import { StatusEnum } from '../../../../../../services/types';

export type SupplierChef = {
  chef: Chef;
  createdAt: string;
  deletedAt: string | null;
  description: string;
  id: string;
  image: string;
  isActive: boolean;
  name: string;
  links: string[];
  updatedAt: string;
  slug: string;
  jobRole: string;
  status: StatusEnum;
  summary: SupplierChefSummary;
};

export type SupplierChefStatus = {
  id: number;
  slug: string;
  name: string;
};

export type SupplierChefSummary = {
  products: string;
  earn: string;
  supplierId: string;
  chefId: string;
  orders: string;
};

export type ResponseSupplierChefs = {
  items: SupplierChef[];
  meta: {
    total: number;
  };
};
