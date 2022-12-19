import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Paper } from '@material-ui/core';
import CustomPhoneInput from 'components/CustomPhoneInput';
import { FormField } from 'components/FormField';
import { useAlert } from 'hooks/useAlert';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { SupplierApi } from 'services/api/admin/SupplierApi';
import { responseErrorsNormalize } from 'utils/responseErrorsNormalize';
import { SupplierRegisterContactInformationSchema } from 'utils/validationSchemas/supplierRegisterFormSchema';

import styles from '../AdminProfile/AdminProfile.module.scss';
import { DynamicLinks } from '../DynamicLinks';
import { SupplierContactInformationStepFieldsProps } from '../RegisterSupplier/types';
import { AdminProfileSupplierProps } from '.';

interface AdminSupplierContactFields {
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    links: Array<{ value: string }>;
  };
}

export const AdminSupplierContactDetails: React.FC<AdminProfileSupplierProps> = ({
  details,
  type,
}): React.ReactElement => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { openAlert } = useAlert();

  const form = useForm<AdminSupplierContactFields>({
    mode: 'onChange',
    resolver: yupResolver(SupplierRegisterContactInformationSchema),
    defaultValues: {
      contactInfo: {
        name: details?.supplier?.contactInfo.name,
        email: details?.supplier?.contactInfo?.email,
        phone: details?.supplier?.contactInfo?.phone,
        links: details?.supplier?.contactInfo?.links?.map((value) => ({ value: value.replace(/http(s)?:\/\//, '') })),
      },
    },
  });
  const { handleSubmit, register, errors, control } = form;

  const onSubmit = async (formFields: AdminSupplierContactFields): Promise<void> => {
    setLoading(true);

    try {
      const normalizeLinks = formFields.contactInfo.links?.map(
        (link) => `https://${link.value.replace(/http(s)?:\/\//, '')}`,
      );
      const preparedData = {
        company: {
          ...details?.supplier?.company,
        },
        contactInfo: {
          ...formFields.contactInfo,
          phone: formFields.contactInfo.phone,
          links: normalizeLinks,
        },
      };

      await SupplierApi.update(type, preparedData);
      openAlert('The new contact details has been successfully saved', 'success');
    } catch (error) {
      if (error.response.status === 422) {
        const normalizedErrors = responseErrorsNormalize(error.response.data.errors);
        normalizedErrors.forEach((err) => {
          form.setError(err.field as any, { message: err.message, shouldFocus: true });
        });

        openAlert(`An error occurred while saving: ${normalizedErrors.map((el) => el.message).join(', ')}`, 'error');
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
          <FormField
            error={errors.contactInfo?.name?.message}
            label="Contact person"
            name="contactInfo.name"
            placeholder="Enter company person"
            register={register}
          />
          <FormField
            label="Email"
            name="contactInfo.email"
            placeholder="Enter company Email"
            register={register}
            error={errors.contactInfo?.email?.message}
          />
          <FormProvider {...form}>
            <CustomPhoneInput label="Phone" name="contactInfo.phone" />
          </FormProvider>
          <DynamicLinks<SupplierContactInformationStepFieldsProps>
            errors={errors}
            name="contactInfo.links"
            control={control}
            register={register}
          />
          <Button
            disabled={loading}
            type="submit"
            classes={{ root: styles.submitButton }}
            variant="contained"
            color="secondary"
            className="mt-20"
          >
            Save
          </Button>
        </div>
      </form>
    </Paper>
  );
};
