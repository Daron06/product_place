import { SelectInputProps } from '@material-ui/core/Select/SelectInput';
import { UploadedImage } from 'components/pages/admin/UploadImages/types';
import { Immutable } from 'immer';
import { FieldError, UseFormMethods } from 'react-hook-form';
import { Chef, MenuOptions, Product, ProductDates, ProductLocationType } from 'redux/ducks/products/types/contracts';
import { DashboardRole, MasterClassAddress, RequiredType, StatusEnum } from 'services/types';

export interface AdminChefTableUpsertViewProps {
  address?: MasterClassAddress;
  countOfPeople: number | undefined;
  countOfPeoples: Array<{ name: string; id: string }>;
  handleSubmit: ReturnType<UseFormMethods<ChefTableUpsertFieldsProps>['handleSubmit']>;
  images?: UploadedImage[];
  language: string;
  languages: Array<{ name: string; value: string }>;
  onChangeImages: (arr: UploadedImage[]) => void;
  onChangeAutocomplete: (fieldName: string, arr: any[]) => void;
  onChangeLanguage: SelectInputProps['onChange'];
  onChangeCountOfPeople: SelectInputProps['onChange'];
  requestAllergies: string;
  required?: RequiredType[];
  isEditing: boolean;
  title: string;
  timeTable: string;
  productType: 'chefTable' | 'masterClass';
  eventType: 'at-home' | 'at-restaurant' | 'recorded';
  role?: DashboardRole;
  chef?: Chef;
  chefs?: Immutable<Chef[]>;
  status?: StatusEnum;
  editPage: boolean;
  isFree?: boolean;
  instruction?: string | null;
}

export interface ChefTableUpsertFieldsProps {
  additionalInfo?: Partial<Product['additionalInfo']>;
  countOfPeople: number & FieldError;
  days?: string;
  chef: Chef;
  vimeoUrl?: string;
  dates: ProductDates[] & FieldError;
  description: string;
  description__ar: string;
  shortDescription: string;
  shortDescription__ar: string;
  duration: number;
  importantInformation: Array<{ value: string }>;
  importantInformation__ar: Array<{ value: string }>;
  language: string;
  name: string;
  name__ar: string;
  media: UploadedImage[] & FieldError;
  program: string;
  program__ar: string;
  price: number & FieldError;
  chefPrice: string | undefined;
  required: Array<RequiredType> & FieldError;
  requestAllergies: string & FieldError;
  requestAllergies__ar: string & FieldError;
  timeTable: string;
  timeTable__ar: string;
  type: ProductLocationType;
  status: StatusEnum;
  address?: MasterClassAddress;
  chatFileUrl?: string;
  menuOptions?: MenuOptions[];
  isFree?: boolean;
  instruction?: string | null;
}
