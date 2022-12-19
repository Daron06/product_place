import { AccountLocationProps } from 'components/pages/admin/AccountLocation';
import { FieldError } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types/form';

import { FormError } from '../../../../redux/ducks/user/types/state';

export interface SupplierAboutStepFieldsProps {
  company: {
    name: string;
    type: string;
    description: string;
    image: (string & FieldError) | string;
  };
}

export interface SupplierLocationStepFieldsProps {
  locationInfo: {
    area: string;
    building: string;
    apartment: string;
    lat: string;
    long: string;
    city: AccountLocationProps['city'];
    notes: string;
    street: string;
  };
}

export interface SupplierContactInformationStepFieldsProps {
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    links: Array<{ value: string }>;
  };
}

export type SupplierFormData = SupplierAboutStepFieldsProps &
  SupplierLocationStepFieldsProps &
  SupplierContactInformationStepFieldsProps;

export interface SupplierStepCommonProps {
  onNext: (formFields: SubmitHandler<SupplierFormData>) => void;
  responseErrors?: FormError[];
}
