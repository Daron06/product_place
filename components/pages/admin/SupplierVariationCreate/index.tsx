import { yupResolver } from '@hookform/resolvers/yup';
import { useAlert } from 'hooks/useAlert';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { SupplierApi } from 'services/api/admin/SupplierApi';
import { DashboardRole, Option, Supplier, Variant } from 'services/types';
import { createSupplierVariantNormalizer } from 'utils/normalizers/CreateSupplierVariantNormalizer';
import { CreateVariationSchema, StaffCreateVariationSchema } from 'utils/validationSchemas/admin/createVariationSchema';

import { SupplierVariationCreateView } from './View';

export interface SupplierCreateVariantFormData {
  name: string;
  type: string;
  description?: string;
  options: Variant[];
  supplier?: { id: string };
}

interface SupplierVariationCreateContextProps {
  onSubmit: (values: SupplierCreateVariantFormData) => void;
  role: DashboardRole.SUPPLIER | DashboardRole.STAFF;
  supplier?: Supplier;
}
export const SupplierVariationCreateContext = React.createContext<SupplierVariationCreateContextProps>(
  {} as SupplierVariationCreateContextProps,
);

interface SupplierVariationCreateProps {
  data?: Option;
  role: DashboardRole.SUPPLIER | DashboardRole.STAFF;
}

export const SupplierVariationCreate: React.FC<SupplierVariationCreateProps> = ({ data, role }) => {
  const router = useRouter();
  const { openAlert } = useAlert();
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(role === 'supplier' ? CreateVariationSchema : StaffCreateVariationSchema),
    defaultValues: {
      name: data?.name || '',
      type: data?.type || '',
      slug: data?.slug || '',
      ...(role === 'staff' ? { supplier: data?.supplier || { id: null } } : {}),
      options: data?.options,
      description: data?.description || '',
    },
  });

  React.useEffect(() => {
    form.register('options');
  }, []);

  const onSubmit = async (values: SupplierCreateVariantFormData): Promise<void> => {
    try {
      const api = data ? SupplierApi.updateVariant.bind(this, data.id) : SupplierApi.createVariant;
      await api(createSupplierVariantNormalizer(values, role));
      await router.push(`/admin/${role}/warehouse/variations`);
      openAlert('Successfully saved', 'success');
    } catch (err) {
      openAlert(`An error occurred while saving: ${err.message}`, 'error');
      console.warn('onSubmit create variant', err);
    }
  };

  return (
    <FormProvider {...form}>
      <SupplierVariationCreateContext.Provider value={{ onSubmit, role, supplier: data?.supplier }}>
        <SupplierVariationCreateView itemData={data} />
      </SupplierVariationCreateContext.Provider>
    </FormProvider>
  );
};
