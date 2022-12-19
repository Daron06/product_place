/* eslint-disable no-param-reassign */
import { FormError, ResponseFormError } from '../redux/ducks/user/types/state';

export const responseErrorsNormalize = (errors: ResponseFormError[] | undefined): FormError[] => {
  return errors
    ? errors.reduce<FormError[]>((prev, cur) => {
        if (cur.children) {
          const arr = cur.children.map((o) => ({
            field: `${cur.field}.${o.field}`,
            message: o.messages[0],
          }));
          return [...prev, ...arr];
        }
        return [
          ...prev,
          {
            field: cur.field,
            message: cur.messages[0],
          },
        ];
      }, [])
    : [];
};
