import * as yup from 'yup';

import { PhoneSchema } from './createCustomerSchema';

export const checkoutFormSchema = (t: any): yup.ObjectSchema<object | undefined, object> => {
  return yup.object().shape({
    email: yup
      .string()
      .trim()
      .email(t ? t('email-format') : 'Email must have a valid format')
      .required(t ? t('email-required') : 'Email is required'),
    firstName: yup
      .string()
      .trim()
      .required(t ? t('first-name-required') : 'First name is required'),
    lastName: yup
      .string()
      .trim()
      .required(t ? t('last-name-required') : 'Last name is required'),
    phone: PhoneSchema(t),
    guests: yup.object().shape({
      adults: yup.number(),
    }),
    notes: yup.string(),
    date: yup.string(),
    instructions: yup.string(),
    paymentMethod: yup.string().oneOf(['Card', 'Cash']),
    options: yup.array(),
  });
};
export const checkoutWithAddressesSchema = (t?: any): yup.ObjectSchema<object | undefined, object> | yup.Lazy => {
  return yup
    .object()
    .concat(checkoutFormSchema(t))
    .shape({
      area: yup.string().required(t('required-area')),
      city: yup
        .object()
        .shape({
          name: yup.string().trim().required(t('required-city')),
          code: yup.string().trim().required(t('required-city')),
        })
        .required(t('required-city')),
      street: yup
        .string()
        .trim()
        .test('len', t('characters-street-min'), (val) => Number(val?.length) > 1)
        .required(t('required-street')),
      building: yup.string().trim().required(t('required-building')),
      apartment: yup.string().trim().required(t('required-flat-apartment')),
    });
};
