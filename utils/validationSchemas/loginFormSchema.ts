import * as yup from 'yup';

export const LoginFormSchema = (
  t: any,
): yup.ObjectSchema<
  yup.Shape<
    object | undefined,
    {
      email: string;
      password: string;
      remember: boolean;
    }
  >,
  object
> => {
  return yup.object().shape({
    email: yup
      .string()
      .trim()
      .email(t ? t('email-format') : 'Email must have a valid format')
      .required(t ? t('email-required') : 'Email is required'),
    password: yup
      .string()
      .trim()
      .required(t ? t('password-required') : 'Password is required')
      .min(8, t ? t('password-format') : 'Password should be a minimum of 8 characters'),
    remember: yup.boolean(),
  });
};
