import * as yup from 'yup';

import { CreateChefTableFormSchema, CreateEditMasterclassSchema, DatesSchema } from './createChefTableSchema';

export const StaffEditChefTableSchema = CreateChefTableFormSchema.clone().shape({
  chef: yup.object().typeError('Chef is required').required('Chef is required'),
});

export const StaffEditMasterclassSchema = CreateEditMasterclassSchema.clone().shape({
  chef: yup.object().typeError('Chef is required').required('Chef is required'),
  price: yup.string().when('isFree', {
    is: (option: boolean) => !option,
    then: () =>
      yup
        .number()
        .typeError('Price must be a number')
        .positive('The price cannot be less than one')
        .min(1, 'Enter price')
        .required('Price is required'),
  }),
  vimeoUrl: yup
    .string()
    .when('type', {
      is: (options: string) => options === 'recorded',
      then: () => yup.string().typeError('link is required').required('link is required'),
    })
    .nullable(),
  dates: yup.object().when('type', {
    is: 'recorded',
    then: () => yup.object().nullable(),
    otherwise: () => DatesSchema.required(),
  }),
  instruction: yup.string().required('You need upload booklet'),
});
