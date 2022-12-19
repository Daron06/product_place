import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress } from '@material-ui/core';
import { CreateHeader } from 'components/pages/admin/CreateHeader';
import { SummaryDetailsList } from 'components/pages/admin/SummaryDetailsList';
import format from 'date-fns/format';
import adminLayoutStyles from 'layouts/AdminLayout/AdminLayout.module.scss';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CustomersApi } from 'services/api/admin/Customers';
import { Customer, CustomerSummary, StatusEnum } from 'services/types';
import { staffCustomerNormalizer } from 'utils/normalizers/StaffCustomerNormalizer';
import { CreateCustomerSchema, ProfileSchema } from 'utils/validationSchemas/createCustomerSchema';

import { useAlert } from '../../../../../../hooks/useAlert';
import { responseErrorsNormalize } from '../../../../../../utils/responseErrorsNormalize';
import { ChangeAvatarBlock } from '../../../ChangeAvatarBlock';
import { ChangeStatusBlock } from '../../../ChangeStatusBlock';
import { PasswordForm } from '../../../PasswordForm';
import { AccountOrdersInfo } from '../../AccountOrdersInfo';
import { AboutCustomer } from './AboutCustomer';

interface StaffCustomerProfileProps {
  data?: Customer;
  summary?: CustomerSummary;
}

export interface StaffCustomerFormFields {
  firstName: string;
  lastName: string;
  image: string;
  email: string;
  phone: string;
  birthday: string;
  gender: string | null;
  password?: string;
  isActive: string;
  status: StatusEnum;
}

export const StaffCustomerProfile: React.FC<StaffCustomerProfileProps> = ({ data, summary }) => {
  const router = useRouter();
  const { openAlert } = useAlert();
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(data ? ProfileSchema(null) : CreateCustomerSchema(null)),
    defaultValues: {
      birthday: data?.birthday ? format(new Date(data?.birthday), 'dd-MM-yyyy') : undefined,
      email: data?.email,
      image: data?.image,
      firstName: data?.firstName,
      lastName: data?.lastName,
      isActive: data?.isActive,
      password: '',
      passwordConfirmation: '',
      status: data?.status,
      phone: data?.phone,
      gender: data?.gender,
    },
  });

  React.useEffect(() => {
    form.register('status');
  }, []);

  const isEditingMode = !!data;

  // TODO Refactoring the CreateHeader and include the code bellow inside component
  let submitButtonContent: React.ReactNode = 'Submit';

  if (form.formState?.isSubmitting) {
    submitButtonContent = (
      <CircularProgress className={adminLayoutStyles.circleProgressColor} color="secondary" size={20} />
    );
  } else if (!isEditingMode) {
    submitButtonContent = 'Save';
  }

  const onSubmit = async (formFields: StaffCustomerFormFields): Promise<void> => {
    try {
      const normalizedFields = staffCustomerNormalizer(formFields);
      if (data?.id) {
        await CustomersApi.update(data.id, normalizedFields);
        openAlert('Customer successfully saved', 'success');
      } else {
        const { id } = await CustomersApi.create(normalizedFields);
        openAlert('Customer successfully created', 'success');
        await router.push(`/admin/staff/customers/edit/${id}`);
      }
    } catch (error) {
      if (error.response.status === 422) {
        const normalizedErrors = responseErrorsNormalize(error.response.data.errors);
        normalizedErrors.forEach((err) => {
          form.setError(err.field as any, { message: err.message, shouldFocus: true });
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
  };

  return (
    <FormProvider {...form}>
      <div className="p-30">
        <CreateHeader
          handleSubmit={form.handleSubmit(onSubmit)}
          title={data?.firstName ? 'Edit customer' : 'Create customer'}
          submitButtonText={submitButtonContent}
          submitButtonDisabled={form.formState.isSubmitting}
          isSubmitting={form.formState.isSubmitting}
        />
        <main className="adminDataUpsertPageGrid">
          <section className="adminDataUpsertSectionGrid">
            <AboutCustomer />
            <PasswordForm />
          </section>
          <aside>
            <ChangeStatusBlock />
            <ChangeAvatarBlock />
            {data && (
              <SummaryDetailsList
                items={[
                  { name: 'Registration date', value: format(new Date(data?.createdAt), 'd/MM/yyyy') },
                  {
                    name: 'Birthday date',
                    value: <span>{data?.birthday ? format(new Date(data?.birthday), 'yyyy-MM-dd') : '---'}</span>,
                  },
                  { name: 'Orders', value: summary?.orders?.length },
                  { name: 'Total spend', value: <b>{summary?.total || 0} AED</b> },
                ]}
              />
            )}
            {summary?.orders && summary?.orders?.length > 0 && <AccountOrdersInfo orders={summary?.orders} />}
          </aside>
        </main>
      </div>
    </FormProvider>
  );
};
