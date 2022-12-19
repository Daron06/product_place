import { yupResolver } from '@hookform/resolvers/yup';
import { useAlert } from 'hooks/useAlert';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { DashboardRole, ProductFormFields } from 'services/types';
import { CreateMenuFormSchema, CreateStaffMenuFormSchema } from 'utils/validationSchemas/admin/createMenuSchema';

import { selectDirectoriesData } from '../../../../redux/ducks/directories/selectors';
import { AdminProductsApi } from '../../../../services/api/admin/ProductsApi';
import { AdminEndpoints } from '../../../../services/api/endpoints';
import { productParametersNormalizer } from '../../../../utils/normalizers/ProductParametersNormalizer';
import { StaffMenuView } from '../staff/menu/View';
import { MenuCreateFieldsProps, RecipeCreateProps } from './types';

export const MenuCreate: React.FC<RecipeCreateProps> = ({
  isEditing,
  menuData,
  role = DashboardRole.CHEF,
}): React.ReactElement => {
  const router = useRouter();
  const { openAlert } = useAlert();
  const { cloudKitchens, allergens: allergensOptions, chefs } = useSelector(selectDirectoriesData);
  const form = useForm<MenuCreateFieldsProps>({
    mode: 'onChange',
    resolver: yupResolver(role === DashboardRole.CHEF ? CreateMenuFormSchema : CreateStaffMenuFormSchema),
    defaultValues: {
      name: menuData?.name,
      chef: menuData?.chef,
      description: menuData?.description,
      calories: String(menuData?.productInfo?.calories),
      proteins: String(menuData?.productInfo?.proteins),
      fat: String(menuData?.productInfo?.fat),
      carbs: String(menuData?.productInfo?.carbs),
      supplier: menuData?.supplier,
      allergens: menuData?.allergens,
      media: menuData?.media,
      cuisine: menuData?.cuisine,
      instruction: menuData?.instruction,
      ingredients: menuData?.ingredients || [],
      preparationTime: menuData?.additionalInfo?.preparationTime,
      productFlags: menuData?.additionalInfo?.productFlags,
    },
  });

  const onSubmit = async (formFields: ProductFormFields): Promise<void> => {
    try {
      const data = productParametersNormalizer(formFields);
      if (menuData) {
        await AdminProductsApi.update(AdminEndpoints.MENU, menuData.id, data);
        openAlert('Successfully updated', 'success');
      } else {
        await AdminProductsApi.create(AdminEndpoints.MENU, data);
        await router.push(`/admin/${role}/menu`);
        openAlert('Successfully added item', 'success');
      }
    } catch (err) {
      console.warn('onSubmit menu', err);
    }
  };

  return (
    <FormProvider {...form}>
      <StaffMenuView
        allergens={menuData?.allergens}
        allergensOptions={allergensOptions}
        chef={menuData?.chef}
        chefs={chefs}
        cuisine={menuData?.cuisine?.id}
        description={menuData?.description ?? ''}
        ingredients={menuData?.ingredients}
        instruction={menuData?.instruction}
        images={menuData?.media}
        isEditing={isEditing}
        onSubmit={form.handleSubmit(onSubmit)}
        productInfo={menuData?.productInfo ?? null}
        supplier={menuData?.supplier}
        suppliers={cloudKitchens || []}
        status={menuData?.status}
        title={menuData?.name ?? 'New Menu'}
        role={role}
        preparationTime={menuData?.additionalInfo?.preparationTime}
        productFlags={menuData?.additionalInfo?.productFlags}
        menuData={menuData}
      />
    </FormProvider>
  );
};
