import * as yup from 'yup';

export const CreateVariationSchema = yup.object().shape({
  name: yup.string().trim().required('Name is required'),
  type: yup.string().trim().required('Type is required'),
  description: yup.string(),
  slug: yup.string(),
  options: yup.array().required('Options is required'),
});

export const StaffCreateVariationSchema = yup
  .object()
  .concat(CreateVariationSchema)
  .shape({
    supplier: yup.object().shape({
      id: yup.string().nullable().required('Supplier is required'),
    }),
  });
