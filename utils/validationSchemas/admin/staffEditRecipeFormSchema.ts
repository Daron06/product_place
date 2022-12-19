import { CreateRecipeFormSchema } from 'utils/validationSchemas/admin/createRecipeSchema';
import * as yup from 'yup';

export const StaffEditRecipeFormSchema = CreateRecipeFormSchema.clone().shape({
  preparationTime: yup
    .number()
    .positive('Preparation time must be greater than zero')
    .typeError('The value cannot be empty, please enter a number')
    .required('Preparation time is required'),
  price: yup
    .number()
    .positive('Price must be greater than zero')
    .typeError('The value cannot be empty, please enter a number')
    .required('Price is required'),
});
