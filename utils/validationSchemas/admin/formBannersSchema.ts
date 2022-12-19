import * as yup from 'yup';

export const FormBannersSchema = yup.object().shape({
  title: yup.string().trim().required('Title is required'),
  buttonText: yup
    .string()
    .trim()
    .when('position', {
      is: 'HOMEPAGE_SLIDER',
      then: () => yup.string().trim().required('Button text is required'),
      otherwise: () => yup.string(),
    }),
  link: yup.string().trim().required('Link is required'),
  status: yup.string().trim().required('Status is required'),
  image: yup.string().trim().required('Image is required'),
  type: yup
    .string()
    .trim()
    .when('position', {
      is: 'HOMEPAGE_SLIDER',
      then: () => yup.string().trim().required('Type is required'),
      otherwise: () => yup.string(),
    }),
  position: yup.string().trim().required('Type is required'),
});
