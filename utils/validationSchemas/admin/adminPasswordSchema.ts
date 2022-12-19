import * as yup from 'yup';

export const AdminPasswordSchema = (t: any): yup.ObjectSchema<object | undefined, object> => {
  return yup.object().shape({
    password: yup
      .string()
      .required(t ? t('password-required') : 'New password is required')
      .min(8, t ? t('password-format') : 'Password should be a minimum of 8 characters'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), undefined], t ? t('repeat-password') : 'Repeat password')
      .notRequired(),
  });
};
