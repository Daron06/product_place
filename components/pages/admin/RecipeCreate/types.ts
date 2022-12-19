import { SelectInputProps } from '@material-ui/core/Select/SelectInput';
import { Immutable } from 'immer';
import { FieldError, UseFormMethods } from 'react-hook-form';
import { Cuisine, Product, Video } from 'redux/ducks/products/types/contracts';

import { ImmutableDirectoriesState } from '../../../../redux/ducks/directories/types/state';
import {
  AdminProductSummary,
  DashboardRole,
  Ingredient,
  Item,
  RequiredType,
  Supplier,
} from '../../../../services/types';
import { RecipeStep } from '../RecipeSteps/types';
import { UploadedImage } from '../UploadImages/types';

export interface RecipeCreateProps {
  title: string;
  recipeData?: Product;
  isEditing?: boolean;
  role?: DashboardRole;
  summary?: AdminProductSummary;
}

export interface RecipeCreateViewProps {
  handleSubmit: ReturnType<UseFormMethods<RecipeCreateFieldsProps>['handleSubmit']>;
  onChangeImages: (arr: UploadedImage[]) => void;
  // TODO: Сделать автотипизацию без any
  onChangeAutocomplete: (fieldName: string, arr: any[]) => void;
  onChangeSteps: (arr: RecipeStep[]) => void;
  onChangeInstruction: (url: string) => void;
  title: string;
  instruction?: string | null;
  supplier?: Supplier;
  steps?: RecipeStep[];
  cuisine?: Cuisine['id'];
  images?: UploadedImage[];
  allergens?: Item[];
  suppliers: ImmutableDirectoriesState['data']['suppliers'] | null | undefined;
  cuisines: ImmutableDirectoriesState['data']['cuisines'] | null | undefined;
  allergensOptions: ImmutableDirectoriesState['data']['allergens'];
  required?: RequiredType[];
  isEditing?: boolean;
  onChangeCuisine: SelectInputProps['onChange'];
  onChangeSupplier: (obj: Omit<Supplier, 'createdAt' | 'deletedAt' | 'updatedAt'> | null) => void;
}

export interface RecipeCreateFieldsProps {
  supplier: Pick<Supplier, 'id' | 'name' | 'slug'> & { ingredients?: Immutable<Ingredient[]> } & FieldError;
  cuisine: Pick<Cuisine, 'id' | 'name' | 'slug'> & FieldError;
  allergens: Item[] & FieldError;
  media: UploadedImage[] & FieldError;
  name: string;
  description: string;
  calories: string;
  proteins: string;
  fat: string;
  carbs: string;
  steps: RecipeStep[] & FieldError;
  ingredients: Ingredient[] & FieldError;
  instruction: string | null;
  required: Array<RequiredType> & FieldError;
  isFree: boolean | string;
  video: Video | null;
  product?: string;
}
