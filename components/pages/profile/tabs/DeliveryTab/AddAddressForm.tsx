import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { Button } from 'components/Button';
import { NewAddresses } from 'components/NewAddresses';
import { useAlert } from 'hooks/useAlert';
import { useIsLoading } from 'hooks/useIsLoading';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { UserApi } from 'services/api/UserApi';
import { ResponseAddress, UserAddress } from 'services/types';
import { responseErrorsNormalize } from 'utils/responseErrorsNormalize';
import { createCustomerAddressSchema } from 'utils/validationSchemas/createCustomerAddressSchema';

import { useTranslate } from '../../../../../hooks/useTranslate';
import { createAreaByName } from '../../../../../utils/normalizers/addressNormalizer';
import styles from './DeliveryTab.module.scss';

interface AddAddressFormProps {
  address?: ResponseAddress;
  currentAddressIdx?: number;
  onClickRemove: () => void;
  onClickCancel: () => void;
}

export const AddAddressForm: React.FC<AddAddressFormProps> = ({
  address,
  onClickRemove,
  onClickCancel,
  currentAddressIdx,
}) => {
  const [isLoading, loading, loaded] = useIsLoading();
  const { openAlert } = useAlert();
  const { t } = useTranslate('profile');
  const { t: validationT } = useTranslate('validation');

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(createCustomerAddressSchema(validationT)),
    defaultValues: {
      area: address?.area.name || '',
      street: address?.street,
      building: address?.building,
      apartment: address?.apartment,
      notes: address?.notes,
      location: {
        lat: address?.lat,
        lng: address?.lng,
        zoom: Number(address?.zoom) || 15,
      },
      city: { name: address?.city.name || 'Dubai', code: address?.city.code || 'dubai' },
    },
  });

  React.useEffect(() => {
    form.register('location');
    form.register('city');
  }, []);

  const onSubmit = async (values: UserAddress): Promise<void> => {
    const data = {
      city: { name: values.city.name, code: values.city.code },
      area: createAreaByName(values.area),
      street: values.street,
      building: values.building,
      notes: values.notes,
      lat: values.location.lat,
      lng: values.location.lng,
      zoom: Number(values.location.zoom),
      apartment: values.apartment,
    };

    try {
      loading();
      if (address) {
        await UserApi.updateAddress({ ...data, id: address?.id });
        openAlert(t('delivery-address.success-updated'), 'success');
      } else {
        await UserApi.createAddress(data);
        openAlert(t('delivery-address.success-added'), 'success');
      }
    } catch (err) {
      openAlert(
        `${t('delivery-address.save-address-failed')}: ${responseErrorsNormalize(err.response?.data?.errors)
          .map((e) => e.message)
          .join(', ')}`,
        'error',
      );
      console.warn('onSubmit menu', responseErrorsNormalize(err.response?.data?.errors));
    } finally {
      loaded();
      onClickCancel();
    }
  };

  return (
    <div className={styles.wrapper}>
      <FormProvider {...form}>
        <NewAddresses
          addImage={false}
          location={{
            lng: address?.lng || '',
            lat: address?.lat || '',
          }}
        />
      </FormProvider>
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center justify-content-between flex">
          <Button
            onClick={form.handleSubmit(onSubmit)}
            type="submit"
            className={styles.saveButton}
            variant="contained"
            color="secondary"
            loading={isLoading}
            disabled={isLoading}
          >
            {t('delivery-address.save-button')}
          </Button>
          <div className="d-flex align-items-center">
            <Button
              onClick={onClickCancel}
              type="submit"
              className={clsx(styles.saveButton)}
              variant="outlined"
              color="secondary"
              disabled={isLoading}
            >
              {t('delivery-address.cancel-button')}
            </Button>
            <Button
              onClick={onClickRemove}
              type="submit"
              className={clsx(styles.deleteButton, 'ml-10')}
              variant="outlined"
              disabled={isLoading || currentAddressIdx === -1}
            >
              {t('delivery-address.delete-button')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
