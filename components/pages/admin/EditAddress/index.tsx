import { yupResolver } from '@hookform/resolvers/yup';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography/Typography';
import { NewAddresses } from 'components/NewAddresses';
import { AdminEditingHeader } from 'components/pages/admin/AdminEditingHeader';
import { AutocompleteBlock } from 'components/pages/admin/AutocompleteBlock';
import { WhiteBlock } from 'components/WhiteBlock/WhiteBlock';
import { useAlert } from 'hooks/useAlert';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Chef } from 'redux/ducks/products/types/contracts';
import { ChefsApi } from 'services/api/admin/ChefsApi';
import { Address, EventAddressFormFields } from 'services/types';
import { addressNormalizer } from 'utils/normalizers/addressNormalizer';
import { CreateAddressSchema } from 'utils/validationSchemas/admin/createAddressSchema';

import styles from './EditAddress.module.scss';

interface EditAddressProps {
  address:
    | (Address & { summary: { chefTable: number; masterClass: number; profit: string; orders: string }; chef?: Chef })
    | null;
  type: 'create' | 'edit';
  chefs?: Chef[] | null;
}

export interface EditAddressFormFields {
  address: EventAddressFormFields;
  chef?: Chef | null;
}

export const EditAddress: React.FC<EditAddressProps> = ({ address, type = 'edit', chefs }) => {
  const { openAlert } = useAlert();
  const router = useRouter();
  const goBackLink = typeof window !== 'undefined' ? location.href.replace(/create|edit\/\d+/, '') : '';
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(CreateAddressSchema),
    defaultValues: {
      chef: address?.chef,
      address: {
        area: address?.area?.name ?? '',
        apartment: address?.apartment,
        building: address?.building,
        street: address?.street,
        notes: address?.notes,
        city: address?.city ?? { code: 'dubai', name: 'Dubai' },
        zoom: address?.zoom,
        location: {
          long: address?.lng || address?.long,
          lat: address?.lat,
        },
        images: address?.images.map((item) => ({ name: '', url: item })),
      },
    },
  });

  React.useEffect(() => {
    form.register('address.location');
    form.register('address.city');
    form.setValue('address.city', { code: 'dubai', name: 'Dubai' });
  }, []);

  const onSubmit = async (formFields: EditAddressFormFields): Promise<void> => {
    try {
      if (type === 'edit') {
        if (!address) {
          openAlert('Address is empty', 'error');
          console.error('Address is empty', address);
          return;
        }
        await ChefsApi.updateAddress(String(address.id), addressNormalizer(formFields.address, formFields?.chef));
        openAlert('The address has been changed', 'success');
      } else {
        await ChefsApi.addAddresses(addressNormalizer(formFields.address, formFields?.chef));
        openAlert('The address has been created', 'success');
        await router.push(goBackLink);
      }
    } catch (error) {
      openAlert('An error occurred while changing the address', 'error');
      console.error(error);
    }
  };

  return (
    <div className="p-30">
      <FormProvider {...form}>
        <AdminEditingHeader isEditing title="Edit Address" onSubmit={form.handleSubmit(onSubmit)} />
        <div className="d-flex">
          <div className="d-flex flex-column flex-auto">
            {chefs && (
              <WhiteBlock className="flex mr-30">
                <AutocompleteBlock items={chefs} name="chef" title="Chef" value={address?.chef} />
              </WhiteBlock>
            )}
            <WhiteBlock className="flex mr-30">
              <div className={styles.address}>
                <NewAddresses
                  fields={{
                    area: 'address.area',
                    city: 'address.city',
                    street: 'address.street',
                    building: 'address.building',
                    notes: 'address.notes',
                    location: 'address.location',
                    images: 'address.images',
                    apartment: 'address.apartment',
                  }}
                  location={{
                    lng: String(address?.lng || address?.long),
                    lat: String(address?.lat),
                  }}
                />
              </div>
            </WhiteBlock>
          </div>
          {type === 'edit' && (
            <div className={styles.summary}>
              <WhiteBlock title="Summary">
                <div className="d-flex align-items-center justify-content-between">
                  <Typography className="text-color-600">Masterclasses</Typography>
                  <Typography className="fw-bold" color="secondary">
                    {address?.summary.masterClass}
                  </Typography>
                </div>
                <Divider className="mt-15 mb-15" />
                <div className="d-flex align-items-center justify-content-between">
                  <Typography className="text-color-600">Chefs Tables</Typography>
                  <Typography className="fw-bold" color="secondary">
                    {address?.summary.chefTable}
                  </Typography>
                </div>
                <Divider className="mt-15 mb-15" />
                <div className="d-flex align-items-center justify-content-between">
                  <Typography className="text-color-600">Paid orders</Typography>
                  <Typography className="fw-bold" color="secondary">
                    {address?.summary.orders}
                  </Typography>
                </div>
                <Divider className="mt-15 mb-15" />
                <div className="d-flex align-items-center justify-content-between">
                  <Typography className="text-color-600">Profit</Typography>
                  <Typography className="fw-bold">{address?.summary.profit}</Typography>
                </div>
              </WhiteBlock>
            </div>
          )}
        </div>
      </FormProvider>
    </div>
  );
};
