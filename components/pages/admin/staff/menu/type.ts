import { IngredientsListProps } from 'components/pages/admin/IngredientsList/IngredientsList';
import { MenuCreateFieldsProps } from 'components/pages/admin/MenuCreate/types';
import { SpecificationBlockProps } from 'components/pages/admin/SpecificationBlock';
import { UploadFileBlockProps } from 'components/pages/admin/UploadFileBlock';
import { UploadedImage } from 'components/pages/admin/UploadImages/types';
import { FieldError, UseFormMethods } from 'react-hook-form';
import { ImmutableDirectoriesState } from 'redux/ducks/directories/types/state';
import { Chef, Cuisine, Product, ProductStatus } from 'redux/ducks/products/types/contracts';
import { DashboardRole, Ingredient, Supplier } from 'services/types';

import { PreparationTimeBlockProps } from '../../PreparationTimeBlock';
import { ProductFlagsBlockProps } from '../../ProductFlagsBlock';
import { ProductStatusChangeBlockProps } from '../../ProductStatusChangeBlock';

export interface StuffMenuChangeProps {
  menuData?: Product;
}

export interface StaffMenuEditFieldsProps extends MenuCreateFieldsProps {
  chefPrice?: string;
  ingredients: Ingredient[] & FieldError;
  msrpPrice?: string;
  price: number;
  status: ProductStatus;
  supplierPrice?: string;
  preparationTime?: PreparationTimeBlockProps['value'];
  productFlags?: ProductFlagsBlockProps['productFlags'];
}

export interface StaffMenuViewProps {
  allergens: SpecificationBlockProps['allergens'];
  allergensOptions: SpecificationBlockProps['allergensOptions'];
  chef?: Chef;
  chefs?: ImmutableDirectoriesState['data']['chefs'];
  cuisine?: Cuisine['id'];
  description: string;
  ingredients?: Readonly<IngredientsListProps['items']>;
  instruction?: UploadFileBlockProps['instruction'];
  images?: UploadedImage[];
  isEditing: boolean;
  onSubmit: ReturnType<UseFormMethods['handleSubmit']>;
  productInfo: SpecificationBlockProps['productInfo'];
  supplier?: Supplier;
  suppliers:
    | ImmutableDirectoriesState['data']['suppliers']
    | ImmutableDirectoriesState['data']['cloudKitchens']
    | null
    | undefined;
  status?: ProductStatusChangeBlockProps['value'];
  title: string;
  role?: DashboardRole;
  preparationTime?: PreparationTimeBlockProps['value'];
  productFlags?: ProductFlagsBlockProps['productFlags'];
  menuData?: Product;
}
