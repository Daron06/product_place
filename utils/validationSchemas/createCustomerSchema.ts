import { isValidPhoneNumber } from 'react-phone-number-input/input-mobile';
import * as yup from 'yup';

import { BirthdaySchema } from './birthdayFormSchema';

export const PhoneSchema = (t: any): yup.StringSchema<string, object> => {
  return yup
    .string()
    .test('len', t ? t('invalid-number') : 'Invalid telephone number', (val) => {
      return isValidPhoneNumber(val || '');
    })
    .required(t ? t('required-number-phone') : 'Phone is required');
};

export const PasswordSchema = (t: any): yup.ObjectSchema<object | undefined, object> => {
  return yup.object().shape({
    password: yup
      .string()
      .test(
        'empty-or-8-characters-check',
        t ? t('password-format') : 'Password should be a minimum of 8 characters',
        (password) => !password || password.length >= 8,
      ),
  });
};

const PasswordConfirmationSchema = (t: any): yup.ObjectSchema<object | undefined, object> => {
  return yup.object().shape({
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), undefined], t ? t('repeat-password') : 'Repeat password')
      .notRequired(),
  });
};

export const ContactInfoSchema = (t: any): yup.ObjectSchema<object | undefined, object> => {
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
    gender: yup.string().nullable(),
  });
};

export const ProfileSchema = (t: any): yup.ObjectSchema<object | undefined, object> => {
  return yup
    .object()
    .concat(BirthdaySchema(t))
    .concat(PasswordSchema(t))
    .concat(PasswordConfirmationSchema(t))
    .concat(ContactInfoSchema(t));
};

export const CreateCustomerSchema = (t?: any): yup.ObjectSchema<object | undefined, object> | yup.Lazy => {
  return yup
    .object()
    .concat(ProfileSchema(t))
    .shape({
      status: yup.string().trim().required(),
      password: yup
        .string()
        .test(
          'empty-or-8-characters-check',
          'Password should be a minimum of 8 characters',
          (password) => !password || password.length >= 8,
        )
        .required(),
    });
};
