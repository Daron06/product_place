import { yupResolver } from '@hookform/resolvers/yup';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Button } from 'components/Button';
import { Icon } from 'components/Icon';
import { NewAddresses } from 'components/NewAddresses';
import { EditAddressFormFields } from 'components/pages/admin/EditAddress';
import { Select } from 'components/Select';
import { useAlert } from 'hooks/useAlert';
import React from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { Chef } from 'redux/ducks/products/types/contracts';
import { ChefsApi } from 'services/api/admin/ChefsApi';
import { DashboardRole, MasterClassAddress } from 'services/types';
import { addressNormalizer } from 'utils/normalizers/addressNormalizer';
import { CreateAddressSchema } from 'utils/validationSchemas/admin/createAddressSchema';

import { useIsLoading } from '../../hooks/useIsLoading';
import { ErrorText } from '../ErrorText';
import styles from './AddAddress.module.scss';

export interface AddAddressProps {
  address?: MasterClassAddress;
  chef?: Chef;
  role: DashboardRole;
}

export const AddAddress: React.FC<AddAddressProps> = ({ address, chef, role }) => {
  const [isLoading, loading, loaded] = useIsLoading();
  const { openAlert } = useAlert();
  const [existingAddress, toggleExistingAddress] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = React.useState<MasterClassAddress | undefined>(address);
  const [addressList, setAddressList] = React.useState<MasterClassAddress[]>([]);
  const firstMountComponent = React.useRef(false);
  const contextForm = useFormContext();

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(CreateAddressSchema),
    defaultValues: {
      address: {
        area: address?.area.name ?? '',
        building: address?.building,
        apartment: address?.apartment,
        street: address?.street,
        notes: address?.notes,
        city: { code: 'dubai', name: 'Dubai' },
        images: address?.images.map((url) => ({ url, name: url })),
        location: {
          lng: address?.long,
          lat: address?.lat,
        },
      },
    },
  });

  const getChefAddresses = async (): Promise<void> => {
    const { items } = await ChefsApi.getAddresses({ take: 0, chef_ids: chef?.id });
    setAddressList(items);
  };

  const onClickAddMore = (): void => {
    setSelectedAddress(undefined);
    toggleExistingAddress(true);
  };

  React.useEffect(() => {
    form.register('address.location');
    form.register('address.city');
    contextForm.register('chef');
  }, []);

  React.useEffect(() => {
    getChefAddresses();

    if (firstMountComponent.current && role === DashboardRole.STAFF) {
      setSelectedAddress(undefined);
    }

    firstMountComponent.current = true;
  }, [chef]);

  const handleAddressSubmit = (formFields: EditAddressFormFields): void => {
    loading();
    ChefsApi.addAddresses(addressNormalizer(formFields.address, chef))
      .then(async (createdAddress) => {
        setSelectedAddress(createdAddress);
        contextForm.setValue('address', createdAddress, { shouldValidate: true });
        openAlert('The new address has been successfully saved', 'success');
        await getChefAddresses();
        toggleExistingAddress(false);
        loaded();
      })
      .catch(() => {
        openAlert('An error occurred while saved a new address', 'error');
        loaded();
      });
  };

  const handleSelectAddress = (event: React.ChangeEvent<{ name?: string; value: unknown }>): void => {
    if (addressList.length > 0) {
      const addressId = event.target.value as string;
      const obj = addressList.find((objAddress) => String(objAddress.id) === addressId);
      setSelectedAddress(obj);
    }
  };

  const handleAddressDelete = (): void => {
    setSelectedAddress(undefined);
    contextForm.setValue('address', null, { shouldValidate: true });
  };

  React.useEffect(() => {
    form.setValue('address.city', { code: 'dubai', name: 'Dubai' }, { shouldValidate: true, shouldDirty: true });
    if (existingAddress) {
      form.setValue('address', null, { shouldValidate: true });
      form.setValue('address.area', '', { shouldValidate: true, shouldDirty: true });
      form.setValue('address.street', '', { shouldValidate: true, shouldDirty: true });
      form.setValue('address.building', '', { shouldValidate: true, shouldDirty: true });
      form.setValue('address.notes', '', { shouldValidate: true, shouldDirty: true });
      form.setValue('address.location', '', { shouldValidate: true, shouldDirty: true });
      form.setValue('address.images', [], { shouldValidate: true, shouldDirty: true });
      form.setValue('address.apartment', '', { shouldValidate: true, shouldDirty: true });
    }
  }, [existingAddress]);

  React.useEffect(() => {
    contextForm.setValue('address', selectedAddress, { shouldValidate: true });
  }, [selectedAddress]);

  React.useEffect(() => {
    if (existingAddress) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [existingAddress]);

  React.useEffect(() => {
    // getChefAddresses();
    form.register('address.location');
    form.register('address.images');
  }, []);

  if (selectedAddress) {
    return (
      <div className={styles.selectedAddress}>
        <div className={styles.selectedAddressImg}>
          <img src={selectedAddress?.images?.[0]} alt="Address" />
        </div>
        <div className={styles.selectedAddressBody}>
          <Typography className="fw-bold fz-large-14">{selectedAddress?.area.name ?? ''}</Typography>
          <Typography className="fz-large-13">{selectedAddress?.street}</Typography>
          <Typography className="fz-large-13">{selectedAddress?.street}</Typography>
        </div>
        <div className="ml-auto">
          <IconButton onClick={handleAddressDelete}>
            <Icon type="close" />
          </IconButton>
        </div>
      </div>
    );
  }

  return (
    <>
      {existingAddress ? (
        <FormProvider {...form}>
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
            isNewAddress={existingAddress}
          />
        </FormProvider>
      ) : (
        addressList.length > 0 && (
          <Select
            items={addressList.map((item) => ({
              value: item.id,
              name: `${[item.city.name, item.area.name, item.street, item.building, item.apartment]
                .filter(Boolean)
                .join(' - ')}`,
            }))}
            label="Saved Addresses"
            name="status"
            onChange={handleSelectAddress}
            placeholder="Select address"
            fullWidth
            disabled={!chef && role === DashboardRole.STAFF}
          />
        )
      )}
      <div className="d-flex align-items-center mt-20">
        {existingAddress && (
          <div className="d-flex justify-content-end flex">
            <Button variant="outlined" color="secondary" onClick={(): void => toggleExistingAddress(false)}>
              Cancel
            </Button>
            <Button
              className="ml-10"
              variant="contained"
              color="primary"
              onClick={form.handleSubmit(handleAddressSubmit)}
              disabled={isLoading || (!chef && role === DashboardRole.STAFF) || !form.errors}
              loading={isLoading}
            >
              Save
            </Button>
          </div>
        )}
        {!existingAddress && (
          <div onClick={onClickAddMore}>
            <Typography color="secondary" className="link">
              + Create address
            </Typography>
          </div>
        )}
      </div>
      {contextForm.formState.isSubmitted && contextForm.formState.errors.address && (
        <ErrorText focus>Addresses is required</ErrorText>
      )}
    </>
  );
};
