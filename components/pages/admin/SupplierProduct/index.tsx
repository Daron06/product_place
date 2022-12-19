import { yupResolver } from '@hookform/resolvers/yup';
import { useAlert } from 'hooks/useAlert';
import { AdminSupplierRecipeProps } from 'pages/admin/supplier/recipes/edit/[id]';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StatusArr } from 'redux/ducks/products/types/contracts';
import { AdminProductsApi } from 'services/api/admin/ProductsApi';
import { DashboardRole, StatusEnum } from 'services/types';
import { SupplierRecipeFormSchema } from 'utils/validationSchemas/admin/supplierReciperSchema';

import { SupplierProductView } from './View';

interface SupplierProductContextProps {
  onSubmit: (values: { supplierPrice: string; status: StatusEnum; preparationTime: number }) => void;
}

interface SupplierProductProps extends AdminSupplierRecipeProps {
  role: DashboardRole;
}

export const SupplierProductContext = React.createContext<SupplierProductContextProps>(
  {} as SupplierProductContextProps,
);

export const SupplierProduct: React.FC<SupplierProductProps> = ({ data, role }) => {
  const { openAlert } = useAlert();

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(SupplierRecipeFormSchema),
    defaultValues: {
      status: data?.status,
      supplierPrice: data?.supplierPrice ? parseFloat(data?.supplierPrice) : '0',
      preparationTime: data?.additionalInfo?.preparationTime,
    },
  });

  if (!data) {
    return null;
  }

  const onSubmit = async (values: {
    supplierPrice: string;
    status: StatusEnum;
    preparationTime: number;
  }): Promise<void> => {
    try {
      const status = StatusArr.find((obj) => obj.slug === values.status);

      if (status) {
        await AdminProductsApi.updateSupplierRecipe(data.id, {
          supplierPrice: values.supplierPrice,
          status: status.slug,
          additionalInfo: data?.additionalInfo
            ? {
                ...data?.additionalInfo,
                preparationTime: values.preparationTime,
              }
            : { preparationTime: values.preparationTime },
        });
      }
      openAlert('The item has been successfully saved', 'success');
    } catch (err) {
      openAlert('Error sending request', 'error');
      console.warn('onSubmit menu', err);
    }
  };

  return (
    <FormProvider {...form}>
      <SupplierProductContext.Provider value={{ onSubmit }}>
        <SupplierProductView data={data} role={role} />
      </SupplierProductContext.Provider>
    </FormProvider>
  );
};
