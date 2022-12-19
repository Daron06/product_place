import * as yup from 'yup';

export const CreateWarehouseSchema = yup.object().shape({
  name: yup.string().trim().required('Name is required'),
  status: yup.string(),
  description: yup.string().trim().required('Description is required'),
  shortDescription: yup.string().trim().required('Short description is required'),
  media: yup.array().required('Add at least one image'),
  category: yup.string().trim().required('Category is required'),
  options: yup.array(),
  additionalInfo: yup.object({
    preparationTime: yup
      .number()
      .positive('Preparation time must be greater than zero')
      .typeError('The value cannot be empty, please enter a number')
      .required('Preparation time is required'),
  }),
  supplierPrice: yup.string().when('options', {
    is: (options: unknown[]) => options?.length === 0,
    then: () => yup.number().positive().typeError('You must specify a number').required('Vendor price is required'),
  }),
  inventory: yup.string().when('options', {
    is: (options: unknown[]) => options?.length === 0,
    then: () =>
      yup.number().positive().integer().typeError('You must specify a number').required('Inventory is required'),
  }),
  msrpPrice: yup.string().when('options', {
    is: (options: unknown[]) => options?.length === 0,
    then: () => yup.number().positive().typeError('You must specify a number').required('MSRP price is required'),
  }),
});

export const CreateStaffWarehouseSchema = yup
  .object()
  .concat(CreateWarehouseSchema)
  .shape({
    chefPrice: yup.string().when('options', {
      is: (options: unknown[]) => options?.length === 0,
      then: () =>
        yup.number().min(0, 'Chef commission must be a positive number').typeError('Chef commission must be a integer'),
    }),
    price: yup.string().when('options', {
      is: (options: unknown[]) => options?.length === 0,
      then: () => yup.number().typeError('You must specify a number').required('Price is required').moreThan(0),
    }),
    supplierPrice: yup.string().when('options', {
      is: (options: unknown[]) => options?.length === 0,
      then: () => yup.string().trim().required('Vendor price is required'),
    }),
    supplier: yup.object().typeError('You have not added supplier').required('Supplier is required'),
  });
