import { ErrorOption } from 'react-hook-form/dist/types/errors';

import { FormError } from '../../../../redux/ducks/user/types/state';

export function setErrorsFromApi(errors: FormError[], setError: (name: string, options: ErrorOption) => void): void {
  errors.forEach((item) =>
    setError(item.field, {
      type: 'manual',
      message: item.message,
    }),
  );
}

export const initialFormData = {
  contactInfo: {
    name: '',
    email: '',
    phone: '',
    links: [{ value: '' }],
  },
  company: {
    name: '',
    type: 'supplier',
    image: '',
    description: '',
  },
  locationInfo: {
    area: '',
    city: { code: '', name: '', cityCode: '' },
    lat: '41.12',
    long: '41.12',
    building: '',
    apartment: '',
    notes: '',
    street: '',
  },
};

export function getSteps(): string[] {
  return ['About', 'Location', 'Contacts'];
}
