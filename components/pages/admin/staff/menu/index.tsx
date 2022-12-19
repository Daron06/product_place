import { yupResolver } from '@hookform/resolvers/yup';
import { StaffMenuEditFieldsProps, StuffMenuChangeProps } from 'components/pages/admin/staff/menu/type';
import { StaffMenuView } from 'components/pages/admin/staff/menu/View';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectDirectoriesData } from 'redux/ducks/directories/selectors';
import { AdminProductsApi } from 'services/api/admin/ProductsApi';
import { AdminEndpoints } from 'services/api/endpoints';
import { DashboardRole, ProductFormFields } from 'services/types';
import { productParametersNormalizer } from 'utils/normalizers/ProductParametersNormalizer';
import { StaffEditMenuSchema } from 'utils/validationSchemas/admin/staffEditMenuSchema';

import { useAlert } from '../../../../../hooks/useAlert';

export const StaffMenuEdit: React.FC<StuffMenuChangeProps> = ({ menuData }): React.ReactElement => {
  const { allergens: allergensOptions, cloudKitchens } = useSelector(selectDirectoriesData);
  const { openAlert } = useAlert();
  const form = useForm<StaffMenuEditFieldsProps>({
    mode: 'onChange',
    resolver: yupResolver(StaffEditMenuSchema),
    defaultValues: {
      allergens: menuData?.allergens,
      calories: String(menuData?.productInfo?.calories),
      carbs: String(menuData?.productInfo?.carbs),
      chefPrice: menuData?.chefPrice,
      cuisine: menuData?.cuisine,
      description: menuData?.description,
      fat: String(menuData?.productInfo?.fat),
      instruction: menuData?.instruction || '',
      ingredients: menuData?.ingredients || [],
      msrpPrice: menuData?.msrpPrice,
      media: menuData?.media,
      name: menuData?.name,
      proteins: String(menuData?.productInfo?.proteins),
      price: menuData?.price,
      status: menuData?.status,
      supplier: menuData?.supplier,
      supplierPrice: menuData?.supplierPrice,
      preparationTime: menuData?.additionalInfo?.preparationTime,
      productFlags: menuData?.additionalInfo?.productFlags,
    },
  });

  React.useEffect(() => {
    // Did this because this value is required, on the backend
    form.register('msrpPrice');
  }, []);

  const onSubmit = async (formFields: ProductFormFields): Promise<void> => {
    if (!menuData) {
      throw new Error('The menu data is undefined');
    }
    try {
      const data = productParametersNormalizer(formFields);
      await AdminProductsApi.update(AdminEndpoints.MENU, menuData.id, data);
    } catch (error) {
      console.error(error);
      if (error?.response) {
        openAlert(error.response?.data.message, 'error');
      }
    }
  };

  return (
    <FormProvider {...form}>
      <StaffMenuView
        allergens={menuData?.allergens}
        allergensOptions={allergensOptions}
        chef={menuData?.chef}
        cuisine={menuData?.cuisine?.id}
        description={menuData?.description ?? ''}
        ingredients={menuData?.ingredients}
        instruction={menuData?.instruction}
        images={menuData?.media}
        isEditing
        onSubmit={form.handleSubmit(onSubmit)}
        productInfo={menuData?.productInfo ?? null}
        supplier={menuData?.supplier}
        suppliers={cloudKitchens || []}
        status={menuData?.status}
        title={menuData?.name ?? 'New Menu'}
        role={DashboardRole.STAFF}
        productFlags={menuData?.additionalInfo?.productFlags}
        menuData={menuData}
      />
    </FormProvider>
  );
};
