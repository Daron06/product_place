import * as yup from 'yup';

import { PhoneSchema } from './createCustomerSchema';

export const SupplierRegisterContactInformationSchema = yup.object().shape({
  contactInfo: yup.object().shape({
    name: yup.string().trim().required('Name is required'),
    email: yup.string().trim().email('Email must have a valid format').required('Email is required'),
    phone: PhoneSchema(null),
    links: yup.array().of(
      yup
        .object()
        .shape({
          value: yup
            .string()
            .trim()
            .matches(/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/, {
              message: 'Incorrect link',
              excludeEmptyString: true,
            })
            .required('Company website is required field'),
        })
        .required('Links is required'),
    ),
  }),
});

export const SupplierRegisterAboutSchema = yup.object().shape({
  company: yup.object().shape({
    image: yup.string().trim().required('Company logo is required'),
    name: yup.string().trim().required('Company name is required'),
    description: yup.string().trim().required('Company description is required'),
  }),
});

export const SupplierRegisterLocationSchema = yup.object().shape({
  locationInfo: yup.object().shape({
    area: yup.string().required(),
    city: yup
      .object()
      .shape({
        name: yup.string().trim().required(),
        code: yup.string().trim().required(),
      })
      .required(),
    building: yup.string().trim().required('Building number is required'),
    apartment: yup.string().trim().required('Flat/Apartment is required'),
    notes: yup.string(),
    lat: yup.string().trim().required(),
    long: yup.string().trim().required(),
    street: yup
      .string()
      .trim()
      .test('len', 'Street must be two characters min', (val) => Number(val?.length) > 1)
      .required('Street is required'),
  }),
});

export const SupplierProfileEditSchema = yup
  .object()
  .concat(SupplierRegisterContactInformationSchema)
  .concat(SupplierRegisterAboutSchema)
  .concat(SupplierRegisterLocationSchema)
  .concat(
    yup.object().shape({
      password: yup
        .string()
        .test(
          'empty-or-8-characters-check',
          'Password should be a minimum of 8 characters',
          (password) => !password || password.length >= 8,
        ),
      passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
    }),
  );
