import * as yup from 'yup';

export const DatesSchema = yup.array().of(
  yup.object().shape({
    date: yup
      .date()
      .when('isWeekly', {
        is: false,
        then: () => yup.date().min(new Date(Date.now())),
      })
      .required(),
    from: yup.string().trim().required(),
    to: yup.string().trim().required(),
    isWeekly: yup.boolean().required(),
  }),
);

export const CreateChefTableFormSchema = yup.object().shape({
  countOfPeople: yup.string().trim().required('Count of people is required'),
  days: yup
    .number()
    .positive('Days must be a positive number')
    .integer('Days must be a integer')
    .typeError('Days must be a number'),
  description: yup.string().trim().required('Description is required'),
  duration: yup.string(),
  menuOptions: yup.array().required(),
  chef: yup.object().nullable(),
  program: yup.string(),
  importantInformation: yup.array().of(yup.object({ value: yup.string() })),
  language: yup.string().trim().required('Language is required'),
  media: yup.array().required('Images is required'),
  name: yup.string().trim().required('Name is required'),
  dates: DatesSchema.required(),
  required: yup.array().required('Appliances & Utensils required is required'),
  status: yup.string(),
  type: yup.string().oneOf(['at-restaurant', 'at-home', 'recorded']).required('Type is required'),
  address: yup
    .object()
    .when('type', {
      is: 'at-restaurant',
      then: () =>
        yup
          .object()
          .shape({
            area: yup
              .object({
                code: yup.string(),
                name: yup.string(),
              })
              .required('Area is required'),
            street: yup
              .string()
              .trim()
              .test('len', 'Street must be two characters min', (val) => Number(val?.length) > 1)
              .required('Street is required'),
            building: yup.string().trim().required('Building number is required'),
            notes: yup.string(),
            location: yup
              .object()
              .shape({
                lat: yup.string(),
                lng: yup.string(),
                zoom: yup.string(),
              })
              .required('Choose you address in map'),
            images: yup.array().required('Images address is required'),
          })
          .nullable()
          .required('Addresses is required'),
    })
    .nullable(),
});

export const CreateEditMasterclassSchema = yup.object().shape({
  countOfPeople: yup.string().trim().required('Count of people is required'),
  isFree: yup.boolean().required(),
  days: yup
    .number()
    .positive('Days must be a positive number')
    .integer('Days must be a integer')
    .typeError('Days must be a number'),
  description: yup.string().trim().required('Description is required'),
  duration: yup.number().when('type', {
    is: 'recorded',
    then: () => yup.number().min(1).required('Duration is required'),
    otherwise: () => yup.number(),
  }),
  chef: yup.object().nullable(),
  program: yup.string().trim().required('Program is required'),
  importantInformation: yup.array().of(yup.object({ value: yup.string() })),
  language: yup.string().trim().required('Language is required'),
  media: yup.array().required('Images is required'),
  name: yup.string().trim().required('Name is required'),
  dates: yup.object().when('type', {
    is: 'recorded',
    then: () => yup.object().nullable(),
    otherwise: () => DatesSchema.required(),
  }),
  chefPrice: yup.string().when('isFree', {
    is: (option: boolean) => !option,
    then: () =>
      yup
        .number()
        .typeError('Price must be a number')
        .positive('The price cannot be less than one')
        .min(1, 'Enter price')
        .required('Price is required'),
  }),
  required: yup.array().required('Appliances & Utensils required is required'),
  status: yup.string(),
  type: yup.string().oneOf(['at-restaurant', 'at-home', 'recorded']).required('Type is required'),
  address: yup
    .object()
    .when('type', {
      is: 'at-restaurant',
      then: () =>
        yup
          .object()
          .shape({
            area: yup
              .object({
                code: yup.string(),
                name: yup.string(),
              })
              .required('Area is required'),
            street: yup
              .string()
              .test('len', 'Street must be two characters min', (val) => Number(val?.length) > 1)
              .trim()
              .required('Street is required'),
            building: yup.string().trim().required('Building number is required'),
            notes: yup.string(),
            location: yup
              .object()
              .shape({
                lat: yup.string(),
                lng: yup.string(),
                zoom: yup.string(),
              })
              .required('Choose you address in map'),
            images: yup.array().required('Images address is required'),
          })
          .nullable()
          .required('Addresses is required'),
    })
    .nullable(),
  vimeoUrl: yup
    .string()
    .when('type', {
      is: (options: string) => options === 'recorded',
      then: () => yup.string().typeError('link is required').required('link is required'),
    })
    .nullable(),
});
