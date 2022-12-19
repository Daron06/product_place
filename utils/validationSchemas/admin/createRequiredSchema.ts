import * as yup from 'yup';

export const CreateRequiredSchema = yup.object().shape({
  name: yup.string().trim().required('Name required'),
  image: yup.string().trim().required('Image required'),
  status: yup.string().trim().required('Status required'),
});
