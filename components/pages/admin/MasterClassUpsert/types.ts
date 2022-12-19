import { SelectInputProps } from '@material-ui/core/Select/SelectInput';
import { ChefTableUpsertFieldsProps } from 'components/pages/admin/ChefTableUpsert/types';
import { UploadedImage } from 'components/pages/admin/UploadImages/types';
import { FieldError, UseFormMethods } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { ProductDates } from 'redux/ducks/products/types/contracts';
import { RequiredType } from 'services/types';

export interface MasterClassUpsertViewProps {
  control: UseFormMethods<MasterClassUpsertFieldsProps>['control'];
  countOfPeople: number;
  countOfPeoples: Array<{ name: string; id: string }>;
  duration: number;
  errors: FieldErrors<MasterClassUpsertFieldsProps>;
  formState?: UseFormMethods<ChefTableUpsertFieldsProps>['formState'];
  handleSubmit: ReturnType<UseFormMethods<MasterClassUpsertFieldsProps>['handleSubmit']>;
  images?: UploadedImage[];
  language: string;
  languages: Array<{ name: string; value: string }>;
  price: number;
  onChangeImages: (arr: UploadedImage[]) => void;
  onChangeAutocomplete: (fieldName: string, arr: any[]) => void;
  onChangeLanguage: SelectInputProps['onChange'];
  onChangeCountOfPeople: SelectInputProps['onChange'];
  onDurationChange: SelectInputProps['onChange'];
  register: UseFormMethods<ChefTableUpsertFieldsProps>['register'];
  required?: RequiredType[];
  setValue: UseFormMethods<ChefTableUpsertFieldsProps>['setValue'];
  isEditing: boolean;
  title: string;
}

export interface MasterClassUpsertFieldsProps {
  countOfPeople: number & FieldError;
  dates: ProductDates[] & FieldError;
  description: string;
  duration: number;
  importantInformation: Array<{ value: string }>;
  groupSize: number & FieldError;
  language: string;
  name: string;
  media: UploadedImage[] & FieldError;
  program: string;
  price: number & FieldError;
  unknownPrice: number & FieldError;
  required: Array<RequiredType> & FieldError;
  requestAllergies: string & FieldError;
  timeTable: string;
  type: string;
}
