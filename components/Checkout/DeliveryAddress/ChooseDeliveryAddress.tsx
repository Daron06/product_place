import { Select } from 'components/Select';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { UserApi } from 'services/api/UserApi';
import { ResponseAddress } from 'services/types';

import styles from '../../Select/Select.module.scss';

const EMPTY_ADDRESS_ID = 'empty';

export const ChooseDeliveryAddress: React.FC = (): React.ReactElement => {
  const [addresses, setAddresses] = React.useState<ResponseAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = React.useState(EMPTY_ADDRESS_ID);
  const { setValue } = useFormContext();

  React.useEffect(() => {
    (async (): Promise<void> => {
      const response = await UserApi.getAddresses();
      const addressCheckout = window.localStorage.getItem('saveAddressCheckout');

      setAddresses(response);

      const addressShow =
        response.find((e) => String(e.id) === addressCheckout)?.id?.toString() ||
        String(response[0].id) ||
        EMPTY_ADDRESS_ID;

      setSelectedAddressId(addressShow);
    })();
  }, []);

  React.useEffect(() => {
    if (selectedAddressId !== EMPTY_ADDRESS_ID) {
      window.localStorage.setItem('saveAddressCheckout', String(selectedAddressId));
      const obj = addresses.find((el) => el.id === Number(selectedAddressId));
      const address = {
        ...obj,
        location: {
          lat: obj?.lat,
          lng: obj?.lng,
        },
      };

      if (address) {
        Object.keys(address).forEach((key) => {
          if (key === 'city') {
            setValue(
              key,
              { name: 'Dubai', code: 'dubai' },
              {
                shouldValidate: true,
                shouldDirty: true,
              },
            );
          } else if (key === 'area') {
            setValue(key, address[key].name, {
              shouldValidate: true,
              shouldDirty: true,
            });
          } else {
            setValue(key, address[key], {
              shouldValidate: true,
              shouldDirty: true,
            });
          }
        });
      }
    }
  }, [selectedAddressId]);

  const handleChange = (e): void => {
    setSelectedAddressId(e.target.value);
  };

  const { t } = useTranslate('checkout');
  return (
    <div className="d-flex justify-content-between align-items-center">
      <Select
        label={t('choose-your-address')}
        value={selectedAddressId}
        items={
          addresses?.length
            ? addresses?.map((item) => ({
                value: item.id || '',
                name: `${item.city.name} - ${item.area.name} - ${item.street}`,
              }))
            : [{ value: EMPTY_ADDRESS_ID, name: 'Choose address' }]
        }
        className={styles.selectChoose}
        onChange={handleChange}
      />
    </div>
  );
};
