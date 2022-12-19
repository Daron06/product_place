import * as yup from 'yup';

export const CreateBlogFormSchema = yup.object().shape({
  title: yup.string().trim().required('title is required'),
  description: yup.string().trim().required('Description is required'),
  shortDescription: yup.string().trim().required('Short Description is required'),
  image: yup.string().trim().required('Image required'),
  category: yup
    .object()
    .shape({
      name: yup.string().trim().required('Please select category'),
    })
    .typeError('Please select category')
    .required('Please select category'),
});
