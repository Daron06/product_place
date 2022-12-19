import { yupResolver } from '@hookform/resolvers/yup';
import { AdminRegisterFormView } from 'components/pages/admin/Register/View';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useIsLoading } from '../../../../hooks/useIsLoading';
import { AuthChefApi } from '../../../../services/api/admin/AuthChefApi';
import { ChefAdminRegisterFormSchema } from '../../../../utils/validationSchemas/chefAdminRegisterFormSchema';

export interface WorkingExperienceItem {
  id?: string;
  name: string;
  description: string;
  photo?: string;
}

export interface AdminRegisterFormFieldsInterface {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobRole: string;
  about: string;
  workingExperience: WorkingExperienceItem[];
  links: Array<{ value: string }>;
}

const AdminRegisterForm = (): React.ReactElement => {
  const [isLoading, loading, loaded] = useIsLoading();
  const router = useRouter();
  const form = useForm<AdminRegisterFormFieldsInterface>({
    resolver: yupResolver(ChefAdminRegisterFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      jobRole: '',
      about: '',
      email: '',
      phone: '',
      workingExperience: [{ name: '', description: '', photo: '' }],
      links: [{ value: '' }],
    },
  });

  const { handleSubmit, register, control, errors, setError } = form;

  const onSubmit = async (formFields: AdminRegisterFormFieldsInterface): Promise<void> => {
    const normalizeLinks = formFields.links?.map((link) => ({
      value: `https://${link.value.replace(/http(s)?:\/\//, '')}`,
    }));

    const preparedData: AdminRegisterFormFieldsInterface = {
      ...formFields,
      links: normalizeLinks,
      phone: formFields.phone,
    };

    try {
      loading();
      await AuthChefApi.register(preparedData);
      loaded();
      router.push('/admin/register/success');
    } catch (error) {
      loaded();
      if (error.response.status === 422) {
        error.response.data.errors.forEach((errorResponse) => {
          setError(errorResponse.field, {
            type: 'manual',
            message: errorResponse.messages.join(','),
          });
        });
      }
    }
  };

  return (
    <FormProvider {...form}>
      <AdminRegisterFormView
        errors={errors}
        register={register}
        handleSubmit={handleSubmit(onSubmit)}
        control={control}
        isLoading={isLoading}
      />
    </FormProvider>
  );
};

export default AdminRegisterForm;
