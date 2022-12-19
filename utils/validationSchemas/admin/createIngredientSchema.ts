import * as yup from 'yup';

export const CreateSupplierIngredientSchema = yup.object().shape({
  name: yup.string().trim().required('Name required'),
  image: yup.string().trim().required('Image required'),
  status: yup.string().trim().required('Status required'),
});

export const CreateStaffIngredientSchema = yup.object().shape({
  supplier: yup.object().typeError('Supplier required').required('Supplier required'),
  ...CreateSupplierIngredientSchema.fields,
});
