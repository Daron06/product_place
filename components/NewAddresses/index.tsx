import clsx from 'clsx';
import _get from 'lodash/get';
import dynamic from 'next/dynamic';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { useTranslate } from '../../hooks/useTranslate';
import { FormField } from '../FormField';
import { MapBoxProps } from '../MapBox';
import { UploadImages } from '../pages/admin/UploadImages';
import styles from '../pages/profile/tabs/DeliveryTab/DeliveryTab.module.scss';

const MapBox = dynamic<MapBoxProps>(() => import('components/MapBox').then((m) => m.MapBox), {
  ssr: false,
});

interface NewAddressesProps {
  fields?: {
    area: string;
    city: string;
    street: string;
    building: string;
    apartment: string;
    notes: string;
    location: string;
    images: string;
  };
  addImage?: boolean;
  location?: { lat: string; lng: string };
  isNewAddress?: boolean;
}

const defaultFields = {
  area: 'area',
  city: 'city',
  street: 'street',
  building: 'building',
  notes: 'notes',
  location: 'location',
  images: 'images',
  apartment: 'apartment',
};

export const NewAddresses: React.FC<NewAddressesProps> = ({
  fields = defaultFields,
  location,
  isNewAddress,
  addImage = true,
}) => {
  const { t } = useTranslate('profile');
  const { register, control, setValue, errors, watch, formState } = useFormContext();

  const locationAddress = location || watch('location');

  const onChangeMap = (data): void => {
    setValue(fields.location, data, { shouldValidate: true, shouldDirty: true });
  };

  React.useEffect(() => {
    setValue(fields.city, { name: 'Dubai', code: 'dubai' });
  }, []);

  return (
    <>
      {isNewAddress && <h3>{t('delivery-address.new-address')}</h3>}
      <MapBox onChange={onChangeMap} defaultValue={locationAddress} placeholder={t('map-placeholder')} />
      {formState.isSubmitted && _get(errors, fields.location) && (
        <p className="error-label">{t('delivery-address.select-your-address')}</p>
      )}
      <div className={clsx(styles.formField, 'mb-20')}>
        <FormField
          error={_get(errors, `${fields.area}.name.message`)}
          register={register}
          label={t('delivery-address.area-label')}
          name={fields.area}
          placeholder={t('delivery-address.enter-your-area')}
        />
      </div>

      <div className={styles.formField}>
        <FormField
          error={_get(errors, `${fields.street}.message`)}
          register={register}
          label={t('delivery-address.street-label')}
          name={fields.street}
          placeholder={t('delivery-address.enter-your-street')}
        />
      </div>
      <div className={styles.formField}>
        <FormField
          register={register}
          label={t('delivery-address.building-label')}
          name={fields.building}
          placeholder={t('delivery-address.enter-your-building')}
          error={_get(errors, `${fields.building}.message`)}
        />
      </div>
      <div className={styles.formField}>
        <FormField
          register={register}
          label={t('delivery-address.apartment-label')}
          name={fields.apartment}
          placeholder={t('delivery-address.apartment-placeholder')}
          error={_get(errors, `${fields.apartment}.message`)}
        />
      </div>
      <div className={styles.formField}>
        <FormField
          label={t('delivery-address.notes-label')}
          name={fields.notes}
          placeholder={t('delivery-address.notes-placeholder')}
          register={register}
          error={_get(errors, `${fields.notes}.message`)}
          textarea
        />
      </div>
      {addImage && (
        <div className={styles.formField}>
          <b className="d-ib mb-5">Images</b>
          <Controller
            control={control}
            name={fields.images}
            render={({ value }): React.ReactElement => (
              <UploadImages
                onChangeImages={(arr): void =>
                  setValue(fields.images, arr, { shouldValidate: true, shouldDirty: true })
                }
                images={isNewAddress ? [] : value}
                error={_get(errors, `${fields.images}.message`)}
              />
            )}
          />
        </div>
      )}
    </>
  );
};
