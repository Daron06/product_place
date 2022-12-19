import { AdminStatuses, StatusEnum } from 'services/types';

export type AddIngredient = {
  name: string;
  image: string;
  status: AdminStatuses;
};

export type AdminIngredientStatus = {
  id: number;
  name: string;
  slug: StatusEnum;
};
