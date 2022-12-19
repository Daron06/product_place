import * as yup from 'yup';

export const CreateUserAddressSchema = yup.object().shape({
  area: yup
    .object()
    .shape({
      name: yup.string().trim().required('Area name is empty'),
      code: yup.string().trim().required('Area code is empty'),
    })
    .required('Area is required'),
  street: yup
    .string()
    .trim()
    .test('len', 'Street must be two characters min', (val) => Number(val?.length) > 1)
    .required('Street is required'),
  city: yup
    .object()
    .shape({
      name: yup.string().trim().required('City is required'),
      code: yup.string().trim().required('City is required'),
    })
    .required('City is required'),
  building: yup.string().trim().required('Building number is required'),
  notes: yup.string(),
  apartment: yup.string().trim().required('Flat/Apartment is required'),
  location: yup
    .object()
    .shape({
      lat: yup.string().trim().required(),
      lng: yup.string().trim().required(),
      zoom: yup.string().trim().required(),
    })
    .required('Choose you address in map'),
});

export const CreateAddressSchema = yup
  .object()
  .concat(CreateUserAddressSchema)
  .shape({
    images: yup.array().required('Images address is required'),
  });
