import { FormControlLabel } from '@material-ui/core';
import { Checkbox } from 'components/Checkbox';
import { Select } from 'components/Select';
import Axios from 'core/axios';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export const AhoySupplierAddress: React.FC = () => {
  const { setValue, watch } = useFormContext();
  const [ahoyValue, setAhoyValue] = React.useState(watch('locationInfo.ahoyLocationId'));
  const [addresses, setAddresses] = React.useState([]);
  const [isSavingAddress, setIsSavingAddress] = React.useState(!!watch('locationInfo.ahoyLocationId'));

  React.useEffect(() => {
    (async (): Promise<void> => {
      const { data } = await Axios.get(`admin/ahoy/locations`);
      setAddresses(data.map((e) => ({ value: e.id, name: e.locationName })));
    })();
  }, []);

  const changeCurrentAddress = (e): void => {
    setAhoyValue(e.target.value);
    setValue('locationInfo.ahoyLocationId', e.target.value, { shouldValidate: true, shouldDirty: true });
  };

  const toggleSavingAddress = (): void => {
    setIsSavingAddress((prev) => !prev);
    setAhoyValue('-1');
    setValue('locationInfo.ahoyLocationId', null, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <>
      <div className="ml-10">
        <FormControlLabel
          control={<Checkbox checked={isSavingAddress} onChange={toggleSavingAddress} />}
          value={isSavingAddress}
          label="Supplier prepares cold food"
        />
      </div>
      <div style={{ width: '50%' }}>
        <Select
          disabled={!isSavingAddress}
          fullWidth
          defaultValue="-1"
          value={isSavingAddress ? ahoyValue || '-1' : '-1'}
          placeholder="Choose ahoy address"
          items={isSavingAddress ? addresses : [{ name: 'Choose ahoy address', value: '-1' }]}
          onChange={changeCurrentAddress}
        />
        {(ahoyValue === '-1' || !ahoyValue) && isSavingAddress && <p style={{ color: 'red' }}>Choose ahoy address</p>}
      </div>
    </>
  );
};
