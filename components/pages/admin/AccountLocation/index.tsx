import { FormField } from 'components/FormField';
import dynamic from 'next/dynamic';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { DashboardRole } from 'services/types';

import { LatLng, MapBoxProps } from '../../../MapBox';
import { AhoySupplierAddress } from '../AhoySupplierAddress';

const MapBox = dynamic<MapBoxProps>(() => import('components/MapBox').then((m) => m.MapBox), {
  ssr: false,
});

export interface AccountLocationProps {
  city?: {
    cityCode: string;
    code: string;
    name: string;
  };
  classes?: {
    map?: string;
  };
  geoValue?: { lat: string; lng: string };
  building?: string;
  apartment?: string;
  noteAboutAddress?: string;
  street?: string;
  role?: DashboardRole;
}

export const AccountLocation: React.FC<AccountLocationProps> = ({ classes, geoValue, noteAboutAddress, role }) => {
  const { errors, register, setValue } = useFormContext();

  React.useEffect(() => {
    register('locationInfo.area');
    register('locationInfo.city');
    register('locationInfo.street');
    register('locationInfo.apartment');
    register('locationInfo.lat');
    register('locationInfo.long');
    register('locationInfo.ahoyLocationId');
  }, [register]);

  const handleChangeLocation = (geo: LatLng): void => {
    setValue('locationInfo.lat', geo.lat, { shouldValidate: true, shouldDirty: true });
    setValue('locationInfo.long', geo.lng, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div
      style={{
        overflow: 'hidden',
      }}
      className={classes?.map}
    >
      <MapBox defaultValue={geoValue} onChange={handleChangeLocation} />
      <div className="mb-10">
        <FormField
          error={errors.area?.message}
          register={register}
          label="Area"
          name="locationInfo.area"
          placeholder="Enter area"
        />
      </div>
      <div>
        <FormField label="Street" error={errors.street?.message} name="locationInfo.street" register={register} />
      </div>
      <div>
        <FormField
          label="Building / Villa number"
          error={errors.building?.message}
          name="locationInfo.building"
          register={register}
        />
      </div>
      <div>
        <FormField
          label="Flat / Apartment number"
          error={errors.apartment?.message}
          name="locationInfo.apartment"
          register={register}
        />
      </div>
      <div>
        <FormField
          label="Notes to the address (optional)"
          defaultValue={noteAboutAddress}
          error={errors.noteAboutAddress?.message}
          name="locationInfo.notes"
          textarea
          register={register}
        />
      </div>
      {role === DashboardRole.STAFF && <AhoySupplierAddress />}
    </div>
  );
};
