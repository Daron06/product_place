import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { SupplierRegisterContactInformationSchema } from 'utils/validationSchemas/supplierRegisterFormSchema';

import { SupplierContactInfo } from '../staff/suppliers/details/SupplierContactInfo';
import { setErrorsFromApi } from './constants';
import { SupplierContactInformationStepFieldsProps, SupplierStepCommonProps } from './types';

interface SupplierContactInformationStepProps extends SupplierStepCommonProps {
  name?: string;
  email?: string;
  phone?: string;
  loading: boolean;
}

export default function SupplierContactInformationStep({
  name,
  email,
  phone,
  onNext,
  responseErrors,
  loading,
}: SupplierContactInformationStepProps): React.ReactElement {
  const form = useForm<SupplierContactInformationStepFieldsProps>({
    mode: 'onChange',
    resolver: yupResolver(SupplierRegisterContactInformationSchema),
    defaultValues: {
      contactInfo: {
        name,
        email,
        phone,
        links: [{ value: '' }],
      },
    },
  });

  const { formState, handleSubmit } = form;

  React.useEffect(() => {
    if (responseErrors?.length) {
      setErrorsFromApi(responseErrors, form.setError);
    }
  }, [responseErrors]);

  return (
    <div className="pl-20 pr-20">
      <FormProvider {...form}>
        <SupplierContactInfo email={email} phone={phone} name={name} />
        <div className="mt-20 mb-20">
          <Button
            disabled={!formState.isDirty || !formState.isValid || loading}
            color="secondary"
            fullWidth
            size="large"
            variant="contained"
            onClick={handleSubmit(onNext)}
          >
            {loading ? <CircularProgress color="secondary" size={20} /> : 'Complete'}
          </Button>
        </div>
      </FormProvider>
    </div>
  );
}
