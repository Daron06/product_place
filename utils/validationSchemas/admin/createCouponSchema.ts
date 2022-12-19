import isDate from 'date-fns/isDate';
import parse from 'date-fns/parse';
import * as yup from 'yup';

const today = new Date();

const parseDateString = (_: unknown, originalValue: string): Date | null | string => {
  if (originalValue === '' || originalValue === null) {
    return null;
  }
  return isDate(originalValue) ? originalValue : parse(originalValue, 'MM-dd-yyyy', today);
};

export const CreateCouponSchema = yup.object().shape({
  code: yup.string().trim().required('Code required'),
  chefs: yup.array().required('Include chef'),
  status: yup.string().trim().required('Status required'),
  sections: yup.array().of(yup.string()).required('Sections required'),
  maxUsesCount: yup
    .number()
    .min(1, 'Uses count must be a positive number')
    .max(1000, 'Maximum number of uses cannot be greater than 1000')
    .required('Uses count is required')
    .typeError('Uses count is required'),
  value: yup
    .number()
    .min(1, 'Coupon value must be a positive number')
    .required('Coupon value is required')
    .typeError('Coupon value is required'),
  expirationDate: yup
    .date()
    .default(null)
    .transform(parseDateString)
    .min(today, 'This expiration date is invalid')
    .typeError('Incorrect expiration date'),
});
