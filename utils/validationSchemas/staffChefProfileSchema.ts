import * as yup from 'yup';

import { PhoneSchema } from './createCustomerSchema';

export const StaffChefProfileSchema = yup.object().shape({
  name: yup.string().trim().required('Name required'),
  jobRole: yup.string().trim().required('Current role required'),
  description: yup.string().trim().required('About information required'),
  image: yup.string().trim().required('Image required'),
  cover: yup.string().trim().required('Cover image is required'),
  email: yup.string().trim().required('Email required'),
  phone: PhoneSchema(null),
  links: yup.array().of(
    yup
      .object()
      .shape({
        value: yup
          .string()
          .required('Social link is required.')
          .matches(/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/, {
            message: 'Incorrect link',
            excludeEmptyString: true,
          }),
      })
      .required(),
  ),
  workingExperience: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string(),
        photo: yup.string(),
        name: yup.string().trim().required('Enter your company name'),
        description: yup.string().trim().required('Enter your role in company'),
      }),
    )
    .required(),
  status: yup.string().trim().required('Status required'),
  password: yup
    .string()
    .test(
      'empty-or-8-characters-check',
      'Password should be a minimum of 8 characters',
      (password) => !password || password.length >= 8,
    ),
  passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
});
