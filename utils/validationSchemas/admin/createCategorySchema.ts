import * as yup from 'yup';

export const CreateCategorySchema = yup.object().shape({
  name: yup.string().trim().required('Name required'),
  status: yup.string().trim().required('Status required'),
  image: yup.string().trim().required('Image required'),
});
