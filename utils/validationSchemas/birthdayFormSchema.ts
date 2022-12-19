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

export const BirthdaySchema = (t: any): yup.ObjectSchema<object | undefined, object> => {
  return yup.object().shape({
    birthday: yup
      .date()
      .nullable()
      .default(null)
      .transform(parseDateString)
      .min(new Date('1970-01-01'), t ? t('date-birth-invalid') : 'This date of birth is invalid')
      .max(today, t ? t('date-birth-invalid') : 'This date of birth is invalid')
      .typeError(t ? t('date-birth') : 'Incorrect date of birth'),
  });
};
