import { CreateMenuFormSchema } from 'utils/validationSchemas/admin/createMenuSchema';
import * as yup from 'yup';

export const StaffEditMenuSchema = CreateMenuFormSchema.clone().shape({
  price: yup
    .number()
    .min(0, 'Price must be a positive number')
    .typeError('Price must be a number')
    .required('Price is required'),
  chefPrice: yup.number().min(0, 'Chef price must be a positive number').typeError('Chef price must be a number'),
  supplierPrice: yup
    .number()
    .min(0, 'Cloud Kitchen cost must be a positive number')
    .typeError('Cloud Kitchen cost must be a number'),
  preparationTime: yup
    .number()
    .positive('Preparation time must be greater than zero')
    .typeError('The value cannot be empty, please enter a number')
    .required('Preparation time is required'),
});
