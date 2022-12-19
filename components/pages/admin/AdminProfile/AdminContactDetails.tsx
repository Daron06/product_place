import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Paper } from '@material-ui/core';
import CustomPhoneInput from 'components/CustomPhoneInput';
import { FormField } from 'components/FormField';
import { useAlert } from 'hooks/useAlert';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ChefsApi } from 'services/api/admin/ChefsApi';
import { staffChefNormalizer } from 'utils/normalizers/StaffChefNormalizer';
import { responseErrorsNormalize } from 'utils/responseErrorsNormalize';
import { PhoneSchema } from 'utils/validationSchemas/createCustomerSchema';
import * as yup from 'yup';

import { DynamicLinks } from '../DynamicLinks';
import { StaffChefFormFields } from '../staff/chefs/details';
import { AdminChefProfileProps } from '.';
import styles from './AdminProfile.module.scss';

const schema = yup.object().shape({
  email: yup.string().required('Email required'),
  phone: PhoneSchema(null),
  links: yup.array().of(
    yup
      .object()
      .shape({
        value: yup
          .string()
          .required('Social link is required.')
          .matches(/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/, {
            message: 'Incorrect link',
            excludeEmptyString: true,
          }),
      })
      .required(),
  ),
});

export const AdminContactDetails: React.FC<AdminChefProfileProps> = ({ details }): React.ReactElement => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { openAlert } = useAlert();

  const form = useForm<StaffChefFormFields>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      links: details?.chef?.links?.length
        ? details?.chef?.links.map((value) => ({ value: value.replace(/http(s)?:\/\//, '') }))
        : [{ value: '' }],
      phone: details?.phone,
      email: details?.email || '',
    },
  });
  const { handleSubmit, errors, control, register } = form;

  const onSubmit = async (data: StaffChefFormFields): Promise<void> => {
    setLoading(true);

    try {
      if (details && details.chef) {
        const normalizedFields = staffChefNormalizer({
          ...data,
          phone: data.phone,
          jobRole: details.chef.jobRole,
          image: details.chef.image,
          cover: details.chef.cover || '',
          name: details.chef.name,
          description: details.chef.description,
          workingExperience: details.chef.workingExperience,
          status: details.chef.status,
          id: String(details.id),
        });

        await ChefsApi.update(details.chef.id, normalizedFields);
        openAlert('The new contact details has been successfully saved', 'success');
      }
    } catch (error) {
      if (error.response.status === 422) {
        const normalizedErrors = responseErrorsNormalize(error.response.data.errors);
        normalizedErrors.forEach((err) => {
          form.setError(err.field.split('.')[1] as any, { message: err.message, shouldFocus: true });
        });
        openAlert(
          `An error occurred while saving: ${responseErrorsNormalize(error.response?.data?.errors)
            .map((el) => el.message)
            .join(', ')}`,
          'error',
        );
      } else {
        openAlert(`An error occurred while saving: ${error?.message}`, 'error');
        console.error(error);
      }
    }

    setLoading(false);
  };

  return (
    <Paper elevation={0} className="p-30">
      <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.info}>
          <FormField label="Email" name="email" register={register} error={errors?.email?.message} />
          <FormProvider {...form}>
            <CustomPhoneInput label="Phone" name="phone" />
          </FormProvider>
          <DynamicLinks errors={errors} control={control} register={register} />
          <Button
            disabled={loading}
            type="submit"
            classes={{ root: styles.submitButton }}
            variant="contained"
            color="secondary"
          >
            Save
          </Button>
        </div>
      </form>
    </Paper>
  );
};
