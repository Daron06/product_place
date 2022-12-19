import * as yup from 'yup';

export const CreateRecipeFormSchema = yup.object().shape({
  supplier: yup.object().typeError('Supplier is required').required('Supplier is required'),
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
  steps: yup
    .array()
    .of(
      yup.object({
        image: yup.string().trim().required('Image required'),
        name: yup.string().trim().nullable().typeError('Name is required').required('Name is required'),
        description: yup
          .string()
          .trim()
          .nullable()
          .typeError('Description is required')
          .trim()
          .required('Description is required'),
        preparationTime: yup
          .number()
          .typeError('Time not specified')
          .min(1, 'Time not specified')
          .max(1000, 'Number too large')
          .required('Time is required'),
      }),
    )
    .required('Fill in the steps'),
  required: yup.array().required('Appliances & Utensils required is required'),
  instruction: yup.string(),
  isFree: yup.boolean(),
  video: yup
    .object({
      url: yup.string().nullable(),
      id: yup.string().nullable(),
    })
    .nullable(),
});
