import * as yup from 'yup';

export const CreateMenuFormSchema = yup.object().shape({
  supplier: yup.object().typeError('Cloud kitchen is required').required('Cloud kitchen is required'),
  name: yup.string().trim().required('Name is required'),
  description: yup.string().trim().required('Description is required'),
  cuisine: yup.object().required('Cuisine is required'),
  allergens: yup.array().required('Allergens is required'),
  media: yup.array().required('Images is required'),
  calories: yup.string().trim().required('Calories is required'),
  proteins: yup.string().trim().required('Proteins is required'),
  fat: yup.string().trim().required('Fat is required'),
  carbs: yup.string().trim().required('Carbs is required'),
  ingredients: yup.array().required('Ingredients is required'),
  instruction: yup.string().nullable(),
});

export const CreateStaffMenuFormSchema = yup
  .object()
  .concat(CreateMenuFormSchema)
  .shape({
    price: yup.number().typeError('Fields must be a number'),
  });
