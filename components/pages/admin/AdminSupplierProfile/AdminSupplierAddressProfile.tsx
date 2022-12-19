import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Paper } from '@material-ui/core';
import { useAlert } from 'hooks/useAlert';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { SupplierApi } from 'services/api/admin/SupplierApi';
import { SupplierRegisterLocationSchema } from 'utils/validationSchemas/supplierRegisterFormSchema';

import { createAreaByName } from '../../../../utils/normalizers/addressNormalizer';
import { AccountLocation } from '../AccountLocation';
import styles from '../AdminProfile/AdminProfile.module.scss';
import { AdminProfileSupplierProps } from '.';

interface AdminSupplierAddressFields {
  locationInfo: {
    city: {
      code: string;
      name: string;
      cityCode: string;
    };
    area: string;
    street: string;
    lat: string;
    long: string;
    building: number;
    notes: string;
    apartment?: string;
    ahoyLocationId?: string;
  };
}

export const AdminSupplierAddressProfile: React.FC<AdminProfileSupplierProps> = ({
  details,
  type,
  role,
}): React.ReactElement => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { openAlert } = useAlert();

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(SupplierRegisterLocationSchema),
    defaultValues: {
      locationInfo: {
        area: details?.supplier?.locationInfo.area?.name || '',
        city: details?.supplier?.locationInfo.city,
        street: details?.supplier?.locationInfo.street,
        lat: details?.supplier?.locationInfo.lat,
        long: details?.supplier?.locationInfo.long,
        building: details?.supplier?.locationInfo?.building,
        apartment: details?.supplier?.locationInfo?.apartment,
        notes: details?.supplier?.locationInfo?.notes,
      },
    },
  });
  const { handleSubmit } = form;

  const onSubmit = async (formFields: AdminSupplierAddressFields): Promise<void> => {
    setLoading(true);

    try {
      const preparedData = {
        company: {
          ...details?.supplier?.company,
        },
        contactInfo: {
          ...details?.supplier?.contactInfo,
        },
        ...formFields,
        locationInfo: {
          ...formFields.locationInfo,
          area: createAreaByName(formFields.locationInfo.area),
        },
      };

      await SupplierApi.update(type, preparedData);
      openAlert('The new address has been successfully saved', 'success');
    } catch (error) {
      openAlert('An error occurred while saved a new address', 'error');
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <Paper elevation={0} className="p-30">
      <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.info}>
          <FormProvider {...form}>
            <AccountLocation
              city={details?.supplier?.locationInfo?.city}
              street={details?.supplier?.locationInfo?.street}
              geoValue={{
                lat: details?.supplier?.locationInfo?.lat || '',
                lng: details?.supplier?.locationInfo?.long || '',
              }}
              building={String(details?.supplier?.locationInfo?.building ?? 0)}
              apartment={String(details?.supplier?.locationInfo?.apartment ?? 0)}
              noteAboutAddress={details?.supplier?.locationInfo?.notes}
              role={role}
            />
          </FormProvider>
          <Button
            disabled={loading}
            type="submit"
            classes={{ root: styles.submitButton }}
            variant="contained"
            color="secondary"
            className="mt-10"
          >
            Save
          </Button>
        </div>
      </form>
    </Paper>
  );
};
