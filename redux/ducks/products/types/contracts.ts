import { WorkingExperienceItem } from 'components/pages/admin/Register';
import { IOrder } from 'services/api/OrderApi';

import { RecipeStep } from '../../../../components/pages/admin/RecipeSteps/types';
import {
  Address,
  Allergen,
  Ingredient,
  Item,
  MasterClassAddress,
  ProductFlagsEnum,
  RequiredType,
  StatusEnum,
  Supplier,
} from '../../../../services/types';
import { ProductType } from '../../favorites/types/contracts';

export type Media = {
  id: string;
  name: string;
  url: string;
  createdAt?: string;
  deletedAt?: string | null;
  updatedAt?: string;
};

export interface ProductDates {
  booked?: number;
  countOfPeople?: number;
  date: string;
  day: string;
  from: string;
  price?: number;
  id?: string;
  isWeekly: boolean;
  to: string;
  url?: string;
}

export type ProductOptionCategory = {
  id: number;
  name: string;
  selectColor: boolean;
  slug: string;
  type: string;
};

export interface ProductOption {
  chefPrice: string | number;
  id: number;
  msrpPrice: string | number;
  inventory: string;
  sku: string;
  option: {
    category: ProductOptionCategory;
    color: string;
    id: number;
    multiplier: number;
    name: string;
    price: number;
    slug: string;
    msrpPrice?: number;
    chefPrice?: number;
    supplierPrice?: number | string;
  };
  price: number | null;
  supplierPrice: string;
}

export interface Video {
  status: 'init' | 'processing' | 'progressing' | 'complete' | 'unknown';
  id: number;
  url: string;
  name: string;
  createdAt: string;
}

export type ProductInfo = {
  calories: number;
  carbs: number;
  fat: number;
  id: string;
  proteins: number;
};

export type ProductLocationType = 'at-home' | 'at-restaurant' | 'recorded';
export type MenuOptions = {
  id?: number;
  name: string;
  name__ar: string;
  chefPrice: number;
  price: number;
  spots: number;
};

export type Product = {
  additionalInfo: {
    countOfPeople: number;
    duration: number;
    program: string;
    program__ar: string;
    type: ProductLocationType;
    language: string;
    timeTable: string;
    timeTable__ar: string;
    requestAllergies: string;
    requestAllergies__ar: string;
    importantInformation: string[];
    importantInformation__ar: string[];
    days?: string;
    preparationTime?: number;
    productFlags?: ('chilled' | 'dry')[];
  } | null;
  addresses: Address[];
  address: MasterClassAddress;
  shortDescription: string | null;
  shortDescription__ar: string | null;
  allergens: Allergen[];
  category: {
    id: number;
    slug: string;
    name: string;
    status: string;
  };
  cuisine?: Cuisine;
  chef: Chef;
  chefPrice: string;
  createdAt: string;
  dates: ProductDates[];
  deletedAt: null;
  description: string;
  description__ar: string;
  id: string;
  image?: string;
  ingredients: Ingredient[] | Item[];
  inventory?: number;
  instruction: string | null;
  instruction__ar: string | null;
  isFree: boolean;
  media: Media[];
  msrpPrice?: string;
  name: string;
  name__ar: string;
  options: ProductOption[];
  price: number;
  productInfo: ProductInfo | null;
  program: string;
  program__ar: string;
  required: RequiredType[];
  rating: number;
  slug: string;
  status: StatusEnum;
  steps: RecipeStep[];
  supplier: Supplier;
  supplierPrice: string;
  type: ProductType;
  video?: Video | null;
  vimeoUrl?: string;
  chatFileUrl?: string;
  updatedAt: string;
  product?: {
    id?: string;
    slug?: string;
    status: StatusEnum;
    additionalInfo: { type?: 'at-restaurant' | 'at-home' };
  };
  datesCount: number;
  menuOptions?: MenuOptions[];
  productDateMasterClassIds?: string[];
};

export type ProductStatus = StatusEnum;

export const StatusArr = [
  { id: '1', slug: StatusEnum.DISABLED, name: 'Disabled' },
  { id: '2', slug: StatusEnum.PENDING, name: 'Pending' },
  { id: '3', slug: StatusEnum.ACTIVE, name: 'Active' },
];

export const ProductFlagsArr = [
  { id: '1', slug: ProductFlagsEnum.CHILLED, name: 'Chilled' },
  { id: '2', slug: ProductFlagsEnum.DRY, name: 'Dry' },
];

export const PreparationTimeArr = [
  {
    value: 60,
    name: '60 minutes',
  },
  {
    value: 90,
    name: '90 minutes',
  },
  {
    value: 120,
    name: '120 minutes',
  },
  {
    value: 150,
    name: '150 minutes',
  },
  {
    value: 180,
    name: '180 minutes',
  },
  {
    value: 210,
    name: '210 minutes',
  },
  {
    value: 240,
    name: '240 minutes',
  },
  {
    value: 270,
    name: '270 minutes',
  },
];

export type ResponseMenu = {
  items: Product[];
  meta: {
    total: number;
  };
};

export type Chef = {
  createdAt: string;
  deletedAt: string | null;
  description: string;
  description__ar?: string;
  id: string;
  image: string;
  cover: string;
  jobRole: string;
  links: string[];
  name: string;
  slug: string;
  updatedAt: string;
  isActive: boolean;
  phone: string;
  orders: number;
  workingExperience: WorkingExperienceItem[];
  status: StatusEnum;
  products: {
    chefStore?: number;
    chefTable?: number;
    masterClass?: number;
    menu?: number;
    recipe?: number;
  };
};

export type StaffSupplier = {
  count: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    links: string[];
  };
  id: string;
  image: string;
  locationInfo: {
    city: {
      code: string;
      name: string;
    };
    area: {
      code: string;
      name: string;
    };
    lat: string;
    long: string;
    building: number;
    notes: string;
    apartment?: string;
  };
  name: string;
  orders: number;
  slug: string;
  status: any;
};

export type StaffSupplierDetails = {
  company: {
    name: string;
    type: string;
    description: string;
    image: string;
  };
  type: string;
  createdAt: string;
  deletedAt: string | null;
  info: {
    firstOrder: string;
    income: string;
    items: string;
    lastOrder: string;
    mealKits: string;
    orders: string;
    registeredAt: string;
    supplierId: string;
    supplierType: string;
  };
  orders: IOrder[];
  updatedAt: string;
  count: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    links: string[];
  };
  id: string;
  locationInfo: {
    city: {
      code: string;
      name: string;
      cityCode: string;
    };
    area: {
      code: string;
      name: string;
    };
    street: string;
    lat: string;
    long: string;
    building: number;
    notes: string;
    apartment?: string;
    ahoyLocationId?: string;
  };
  slug: string;
  status: string;
};

export type Cuisine = {
  id: string;
  name: string;
  name__ar: string;
  slug: string;
  status: StatusEnum;
  menus: number;
  mealKits: number;
};

export type AdminStaffAccounting = {
  id: string;
  amount: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  data: {
    id: string;
    chef: string;
    order: string;
    product: string;
    chefUser: string;
    supplier: string;
    chefReward: string;
    supplierUser: string;
    supplierReward: string;
  };
  info: string;
  status: string;
  vendor: {
    id: string;
    userId: string;
    type: string;
    name: string;
    image: string;
  };
};
