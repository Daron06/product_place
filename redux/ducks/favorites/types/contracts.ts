import { Chef, Product } from 'redux/ducks/products/types/contracts';

export type ProductType = 'chef' | 'menu' | 'chefTable' | 'recipe' | 'store' | 'masterClass' | 'chefStore';

export type MeetType = 'online' | 'offline' | 'recorded';

export type AddFavorite = {
  productId?: string;
  chefId?: string;
};

export type FavoriteItem = {
  id: number;
  data?: {
    slug: string;
    description: string;
    image: string | null;
    isActive: boolean;
    links: string[];
    createdAt: string;
    updatedAt: string | null;
    deletedAt: string | null;
  };
};

export type ApiFavoriteParams = {
  type: ProductType;
  id: number;
};

export type ResponseFavorite = {
  items: FavoriteItem[];
  meta: {
    total: number;
  };
};

type FavoriteTypeItem = Product[] | Chef[];

export type ResponseFavoriteType = {
  items: FavoriteTypeItem;
  meta: {
    total: number;
  };
};
