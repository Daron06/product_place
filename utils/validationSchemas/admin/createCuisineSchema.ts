import * as yup from 'yup';

export const CreateCuisineSchema = yup.object().shape({
  name: yup.string().trim().required('Name required'),
  status: yup.string().trim().required('Status required'),
});
