import { SelectInputProps } from '@material-ui/core/Select/SelectInput';
import { FieldError, UseFormMethods } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { Chef, Cuisine, Product } from 'redux/ducks/products/types/contracts';

import { ImmutableDirectoriesState } from '../../../../redux/ducks/directories/types/state';
import { DashboardRole, Ingredient, Item, Supplier } from '../../../../services/types';
import { PreparationTimeBlockProps } from '../PreparationTimeBlock';
import { ProductFlagsBlockProps } from '../ProductFlagsBlock';
import { UploadedImage } from '../UploadImages/types';

export interface RecipeCreateProps {
  title: string;
  menuData?: Product;
  isEditing: boolean;
  role?: DashboardRole.CHEF | DashboardRole.STAFF;
}

export interface MenuCreateViewProps {
  errors: FieldErrors<MenuCreateFieldsProps>;
  handleSubmit: ReturnType<UseFormMethods<MenuCreateFieldsProps>['handleSubmit']>;
  register: UseFormMethods<MenuCreateFieldsProps>['register'];
  control: UseFormMethods<MenuCreateFieldsProps>['control'];
  watch?: UseFormMethods<MenuCreateFieldsProps>['watch'];
  setValue?: UseFormMethods<MenuCreateFieldsProps>['setValue'];
  formState?: UseFormMethods<MenuCreateFieldsProps>['formState'];
  onChangeImages: (arr: UploadedImage[]) => void;
  onChangeAutocomplete: (fieldName: string, arr: Item[]) => void;
  onChangeInstruction: (url: string) => void;
  suppliers: ImmutableDirectoriesState['data']['suppliers'] | null | undefined;
  cuisines: ImmutableDirectoriesState['data']['cuisines'] | null | undefined;
  allergensOptions: ImmutableDirectoriesState['data']['allergens'];
  title: string;
  instruction?: string | null;
  supplier?: Supplier;
  cuisine?: Cuisine['id'];
  images?: UploadedImage[];
  allergens?: Item[];
  ingredients?: Ingredient[];
  isEditing?: boolean;
  onChangeCuisine: SelectInputProps['onChange'];
  onChangeSupplier: (obj: Supplier | null) => void;
}

export interface MenuCreateFieldsProps {
  supplier: Pick<Supplier, 'id' | 'name' | 'slug'> & FieldError;
  cuisine: Pick<Cuisine, 'id' | 'name' | 'slug'> & FieldError;
  allergens: Item[] & FieldError;
  media: UploadedImage[] & FieldError;
  name: string;
  chef: Chef;
  description: string;
  calories: string;
  proteins: string;
  fat: string;
  carbs: string;
  instruction: string | null;
  ingredients: Ingredient[] & FieldError;
  preparationTime?: PreparationTimeBlockProps['value'];
  productFlags?: ProductFlagsBlockProps['productFlags'];
}
