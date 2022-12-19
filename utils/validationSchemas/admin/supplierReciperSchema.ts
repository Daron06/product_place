import * as yup from 'yup';

export const SupplierRecipeFormSchema = yup.object().shape({
  status: yup.string().trim().required('Status is required'),
  supplierPrice: yup
    .number()
    .positive('Supplier price must be a positive number')
    .typeError('Enter the number')
    .required('Price is required'),
  preparationTime: yup
    .number()
    .positive('Preparation time must be greater than zero')
    .typeError('The value cannot be empty, please enter a number')
    .required('Preparation time is required'),
});
