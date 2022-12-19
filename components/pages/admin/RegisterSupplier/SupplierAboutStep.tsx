import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { setErrorsFromApi } from 'components/pages/admin/RegisterSupplier/constants';
import { SupplierAbout } from 'components/pages/admin/staff/suppliers/details/SupplierAbout';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { SupplierRegisterAboutSchema } from 'utils/validationSchemas/supplierRegisterFormSchema';

import styles from './RegisterSupplier.module.scss';
import { SupplierAboutStepFieldsProps, SupplierStepCommonProps } from './types';

interface SupplierAboutStepProps extends SupplierStepCommonProps {
  description?: string;
  name?: string;
  type?: string;
  image?: string;
}

export default function SupplierAboutStep({
  description,
  name,
  type,
  responseErrors,
  image,
  onNext,
}: SupplierAboutStepProps): React.ReactElement {
  const form = useForm<SupplierAboutStepFieldsProps>({
    mode: 'onChange',
    resolver: yupResolver(SupplierRegisterAboutSchema),
    defaultValues: {
      company: {
        description,
        image,
        name,
        type,
      },
    },
  });

  const { handleSubmit } = form;

  React.useEffect(() => {
    if (responseErrors?.length) {
      setErrorsFromApi(responseErrors, form.setError);
    }
  }, [responseErrors]);

  return (
    <div className={styles.stepperInner}>
      <Typography className={styles.stepTitle} variant="h5">
        About your company
      </Typography>
      <FormProvider {...form}>
        <SupplierAbout image={image} />
        <div className="mt-20 mb-20">
          <Button color="primary" fullWidth size="large" variant="contained" onClick={handleSubmit(onNext)}>
            Next
          </Button>
        </div>
      </FormProvider>
    </div>
  );
}
