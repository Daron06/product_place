import { Immutable } from 'immer';
import { Chef } from 'redux/ducks/products/types/contracts';
import { Address, Supplier } from 'services/types';

import { LoadingState } from '../../../types';
import { ProductType } from '../../favorites/types/contracts';

interface UserFavoriteItem {
  id: string;
  typeId: number;
  type: ProductType;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  USER = 'USER',
  CHEF = 'CHEF',
  STAFF = 'STAFF',
  SUPPLIER = 'SUPPLIER',
  CLOUD_KITCHEN = 'CLOUD_KITCHEN',
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role?: UserRole;
  birthday?: string | null;
  gender?: 0 | 1 | null;
  favorites: UserFavoriteItem[];
  notifications: Notification[];
  addresses: Address[];
  image: string | null;
  isEmailNotification: boolean;
  isPushNotification: boolean;
  isSmsNotification: boolean;
  chef?: Chef;
  supplier?: Supplier;
  chefCount?: number;
  menuCount?: number;
  recipeCount?: number;
  chefTableCount?: number;
  chefStoreCount?: number;
  masterClassCount?: number;
}

export type FormError = { field: string; message: string };
export interface Notification {
  createdAt: string;
  data: {
    additionalInfo: { isForAdmin: boolean };
    id: string;
    text: string;
    text__ar?: string;
    title: string;
    title__ar?: string;
    type: string;
  };
  id: string;
  readAt: string | null | Date;
  type: string;
  typeId: number;
  updatedAt: string;
}

export interface ResponseFormError {
  field: string;
  messages: string[];
  children?: ResponseFormError[];
}

export interface UserState {
  data: User | null;
  status: LoadingState;
  errors: FormError[] | null;
  authErrorMessage?: string;
}

export type ImmutableUserState = Immutable<UserState>;
