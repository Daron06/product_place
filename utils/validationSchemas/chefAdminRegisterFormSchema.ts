import * as yup from 'yup';

import { PhoneSchema } from './createCustomerSchema';

export const ChefAdminRegisterFormSchema = yup.object().shape({
  firstName: yup.string().trim().required('First name is required'),
  lastName: yup.string().trim().required('Last name is required'),
  jobRole: yup.string().trim().required('Role is required'),
  about: yup.string().trim().required('About info is required'),
  email: yup.string().trim().email('Email must have a valid format').required('Email is required'),
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
});
