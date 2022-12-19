import * as yup from 'yup';

export const CreateAddressSchema = yup.object().shape({
  address: yup.object().shape({
    area: yup.string().typeError('Please enter your area').required('Please enter your area'),
    apartment: yup.string().trim().required('Flat/Apartment is required'),
    street: yup
      .string()
      .trim()
      .test('len', 'Street must be two characters min', (val) => Number(val?.length) > 1)
      .required('Street is required'),
    building: yup.string().trim().required('Building number is required'),
    location: yup
      .object()
      .shape({
        lat: yup.string().required(),
        long: yup.string().required(),
        zoom: yup.string(),
      })
      .required('Choose you address in map'),
    city: yup
      .object()
      .shape({
        name: yup.string().trim().required('City name is empty'),
        code: yup.string().trim().required('City code is empty'),
      })
      .typeError('Please select city')
      .required(),
    notes: yup.string(),
    images: yup.array().required('Images required'),
  }),
});
