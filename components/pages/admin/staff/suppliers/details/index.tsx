import { yupResolver } from '@hookform/resolvers/yup';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CreateHeader } from 'components/pages/admin/CreateHeader';
import { PasswordForm } from 'components/pages/admin/PasswordForm';
import { SupplierAbout } from 'components/pages/admin/staff/suppliers/details/SupplierAbout';
import { SupplierContactInfo } from 'components/pages/admin/staff/suppliers/details/SupplierContactInfo';
import { Select } from 'components/Select';
import { WhiteBlock } from 'components/WhiteBlock/WhiteBlock';
import { useAlert } from 'hooks/useAlert';
import keyBy from 'lodash/keyBy';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StaffSupplierDetails } from 'redux/ducks/products/types/contracts';
import { StaffApi } from 'services/api/admin/StaffApi';
import { DashboardRole } from 'services/types';
import { responseErrorsNormalize } from 'utils/responseErrorsNormalize';
import { SupplierProfileEditSchema } from 'utils/validationSchemas/supplierRegisterFormSchema';

import { createAreaByName } from '../../../../../../utils/normalizers/addressNormalizer';
import { AccountLocation } from '../../../AccountLocation';
import { AccountOrdersInfo } from '../../AccountOrdersInfo';
import { SupplierInfo } from './SupplierInfo';

interface SupplierDetailsProps {
  data?: StaffSupplierDetails;
  type: 'supplier' | 'cloud-kitchen';
  role?: DashboardRole;
}

const supplierStatuses = [
  {
    value: 'active',
    name: 'Active',
  },
  {
    value: 'blocked',
    name: 'Blocked',
  },
  {
    value: 'pending',
    name: 'Pending',
  },
  {
    value: 'rejected',
    name: 'Rejected',
  },
  {
    value: 'stopped',
    name: 'Stopped',
  },
  {
    value: 'disabled',
    name: 'Disabled',
  },
];

interface SupplierDetailFormFields {
  company: {
    name: string;
    type: string;
    description: string;
    image: string;
  };
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    links: Array<{ value: string }>;
  };
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
  password?: string;
  status: string;
}

export const SupplierDetails: React.FC<SupplierDetailsProps> = ({ data, type, role }) => {
  const { openAlert } = useAlert();
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(SupplierProfileEditSchema),
    defaultValues: {
      company: {
        name: data?.company?.name,
        type: data?.company?.type,
        description: data?.company?.description,
        image: data?.company?.image,
      },
      contactInfo: {
        name: data?.contactInfo.name,
        email: data?.contactInfo?.email,
        phone: data?.contactInfo?.phone,
        links: data?.contactInfo?.links?.map((value) => ({ value: value.replace(/http(s)?:\/\//, '') })),
      },
      locationInfo: {
        area: data?.locationInfo.area?.name || '',
        city: data?.locationInfo.city,
        lat: data?.locationInfo.lat,
        long: data?.locationInfo.long,
        building: data?.locationInfo?.building,
        street: data?.locationInfo?.street,
        apartment: data?.locationInfo?.apartment,
        ahoyLocationId: data?.locationInfo?.ahoyLocationId,
      },
      status: data?.status,
    },
  });

  React.useEffect(() => {
    form.register('status');
    form.setValue('address.city', { code: 'dubai', name: 'Dubai' }, { shouldValidate: true, shouldDirty: true });
  }, [form]);

  if (!data) {
    return <div>No display data</div>;
  }

  const onSubmit = async (formFields: SupplierDetailFormFields): Promise<void> => {
    try {
      const normalizeLinks = formFields.contactInfo.links?.map(
        (link) => `https://${link.value.replace(/http(s)?:\/\//, '')}`,
      );

      const preparedData = {
        ...formFields,
        locationInfo: {
          ...formFields.locationInfo,
          area: createAreaByName(formFields.locationInfo.area),
        },
        contactInfo: {
          ...formFields.contactInfo,
          links: normalizeLinks,
        },
      };

      await StaffApi.update(type, data.id, preparedData);
      openAlert('Successfully saved', 'success');
    } catch (error) {
      if (error.response.status === 422) {
        const normalizedErrors = responseErrorsNormalize(error.response.data.errors);
        normalizedErrors.forEach((err) => {
          form.setError(err.field as any, { message: err.message, shouldFocus: true });
        });
        openAlert(
          `An error occurred while saving: ${responseErrorsNormalize(error.response?.data?.errors)
            .map((el) => el.message)
            .join(', ')}`,
          'error',
        );
      } else {
        openAlert(`An error occurred while saving: ${error?.message}`, 'error');
        console.error(error);
      }
    }
  };

  const handleStatusChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>): void => {
    const statusesKeyBy = keyBy(supplierStatuses, 'value');
    form.setValue('status', statusesKeyBy[event.target.value as string].value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const submitButtonContent: React.ReactNode = form.formState?.isSubmitting ? (
    <CircularProgress color="secondary" size={20} />
  ) : (
    'Save'
  );

  return (
    <FormProvider {...form}>
      <div className="p-20 mb-20">
        <CreateHeader
          title={data?.company.name}
          handleSubmit={form.handleSubmit(onSubmit)}
          submitButtonText={submitButtonContent}
        />
        <main className="adminDataUpsertPageGrid">
          <section className="adminDataUpsertSectionGrid">
            <WhiteBlock title="About" className="mb-20">
              <SupplierAbout image={data.company?.image} />
            </WhiteBlock>
            <WhiteBlock title="Location" className="mb-20">
              <AccountLocation
                city={data.locationInfo?.city}
                geoValue={{ lat: data.locationInfo?.lat, lng: data.locationInfo?.long }}
                building={String(data.locationInfo?.building ?? 0)}
                noteAboutAddress={data.locationInfo?.notes}
                role={role}
              />
            </WhiteBlock>
            <SupplierContactInfo
              email={data.contactInfo.email}
              phone={data.contactInfo.phone}
              name={data.contactInfo.name}
              links={data.contactInfo.links}
            />
            <PasswordForm />
          </section>
          <aside className="adminDataUpsertAsideGrid">
            <WhiteBlock title="Status" className="mb-20">
              <Select
                fullWidth
                items={supplierStatuses}
                onChange={handleStatusChange}
                name="status"
                defaultValue={data.status}
              />
            </WhiteBlock>
            <SupplierInfo title={type === 'supplier' ? 'Supplier info' : 'Kitchen info'} data={data.info} />
            <AccountOrdersInfo orders={data.orders} type={data.type} />
          </aside>
        </main>
      </div>
    </FormProvider>
  );
};
