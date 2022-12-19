import * as yup from 'yup';

export const createCustomerAddressSchema = (t?: any): yup.ObjectSchema<object | undefined, object> | yup.Lazy => {
  return yup.object().shape({
    area: yup.string().required(t('required-area')),
    street: yup
      .string()
      .trim()
      .test('len', t('characters-street-min'), (val) => Number(val?.length) > 1)
      .required(t('required-street')),
    city: yup
      .object()
      .shape({
        name: yup.string().trim().required(t('required-city')),
        code: yup.string().trim().required(t('required-city')),
      })
      .required(t('required-city')),
    building: yup.string().trim().required(t('required-building')),
    notes: yup.string(),
    apartment: yup.string().trim().required(t('required-flat-apartment')),
    location: yup
      .object()
      .shape({
        lat: yup.string().trim().required(),
        lng: yup.string().trim().required(),
        zoom: yup.string().trim().required(),
      })
      .required(t('required-choose-address')),
  });
};
