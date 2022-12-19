import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { AccountLocation, AccountLocationProps } from 'components/pages/admin/AccountLocation';
import { setErrorsFromApi } from 'components/pages/admin/RegisterSupplier/constants';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { SupplierRegisterLocationSchema } from 'utils/validationSchemas/supplierRegisterFormSchema';

import styles from './RegisterSupplier.module.scss';
import { SupplierLocationStepFieldsProps, SupplierStepCommonProps } from './types';

interface SupplierLocationStepProps extends SupplierStepCommonProps {
  area?: string;
  city?: AccountLocationProps['city'];
  building?: string;
  apartment?: string;
  notes?: string;
  lat: string;
  long: string;
  street?: string;
}

export const SupplierLocationStep: React.FC<SupplierLocationStepProps> = ({
  area,
  city,
  building,
  apartment,
  lat,
  long,
  responseErrors,
  notes,
  onNext,
  street,
}) => {
  const form = useForm<SupplierLocationStepFieldsProps>({
    mode: 'onChange',
    resolver: yupResolver(SupplierRegisterLocationSchema),
    defaultValues: {
      locationInfo: {
        area,
        city: { name: 'Dubai', code: 'dubai', cityCode: 'dubai' },
        building,
        apartment,
        lat,
        long,
        notes,
        street,
      },
    },
  });

  React.useEffect(() => {
    if (responseErrors?.length) {
      setErrorsFromApi(responseErrors, form.setError);
    }
  }, [responseErrors]);

  return (
    <div className="pl-20 pr-20">
      <Typography className={styles.stepTitle} variant="h5">
        Your location
      </Typography>
      <FormProvider {...form}>
        <AccountLocation
          city={city}
          classes={{
            map: styles.map,
          }}
          building={String(building ?? 0)}
          apartment={String(apartment ?? 0)}
          noteAboutAddress={notes}
        />
        <div className="mt-20 mb-20">
          <Button
            color="primary"
            disabled={!form.formState.isValid}
            fullWidth
            size="large"
            variant="contained"
            onClick={form.handleSubmit(onNext)}
          >
            Next
          </Button>
        </div>
      </FormProvider>
    </div>
  );
};
