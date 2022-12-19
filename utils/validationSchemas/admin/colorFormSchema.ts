import * as yup from 'yup';

export const ColorFormSchema = yup.object().shape({
  color: yup.string().matches(/^#[0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?$/, {
    message: 'Incorrect HEX-color',
  }),
  name: yup.string().required('Name is required'),
});
